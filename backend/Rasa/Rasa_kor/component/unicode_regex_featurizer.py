from __future__ import absolute_import, division, print_function, unicode_literals


import io
import logging
import numpy as np
import os
import re
import typing
from typing import Any, Dict, Optional, Text

from rasa.nlu import utils
from rasa.nlu.config import RasaNLUModelConfig
from rasa.nlu.featurizers import Featurizer
from rasa.nlu.training_data import Message, TrainingData
import rasa.utils.io
from rasa.nlu.constants import (
    MESSAGE_TOKENS_NAMES,
    MESSAGE_TEXT_ATTRIBUTE,
    MESSAGE_VECTOR_FEATURE_NAMES,
)

logger = logging.getLogger(__name__)

if typing.TYPE_CHECKING:
    from rasa.nlu.model import Metadata


class RegexFeaturizer(Featurizer):

    provides = [MESSAGE_VECTOR_FEATURE_NAMES[MESSAGE_TEXT_ATTRIBUTE]]

    requires = [MESSAGE_TOKENS_NAMES[MESSAGE_TEXT_ATTRIBUTE]]

    def __init__(self, component_config=None, known_patterns=None, lookup_tables=None):

        super().__init__(component_config)

        self.known_patterns = known_patterns if known_patterns else []
        lookup_tables = lookup_tables or []
        self._add_lookup_table_regexes(lookup_tables)

    def train(
        self, training_data: TrainingData, config: RasaNLUModelConfig, **kwargs: Any
    ) -> None:

        self.known_patterns = training_data.regex_features
        self._add_lookup_table_regexes(training_data.lookup_tables)

        for example in training_data.training_examples:
            updated = self._text_features_with_regex(example)
            example.set(MESSAGE_VECTOR_FEATURE_NAMES[MESSAGE_TEXT_ATTRIBUTE], updated)

    def process(self, message: Message, **kwargs: Any) -> None:

        updated = self._text_features_with_regex(message)
        message.set(MESSAGE_VECTOR_FEATURE_NAMES[MESSAGE_TEXT_ATTRIBUTE], updated)

    def _text_features_with_regex(self, message):
        if self.known_patterns:
            extras = self.features_for_patterns(message)
            return self._combine_with_existing_features(message, extras)
        else:
            return message.get(MESSAGE_VECTOR_FEATURE_NAMES[MESSAGE_TEXT_ATTRIBUTE])

    def _add_lookup_table_regexes(self, lookup_tables):
        # appends the regex features from the lookup tables to
        # self.known_patterns
        for table in lookup_tables:
            regex_pattern = self._generate_lookup_regex(table)
            lookup_regex = {"name": table["name"], "pattern": regex_pattern}
            self.known_patterns.append(lookup_regex)

    def features_for_patterns(self, message):
        """Checks which known patterns match the message.
        Given a sentence, returns a vector of {1,0} values indicating which
        regexes did match. Furthermore, if the
        message is tokenized, the function will mark all tokens with a dict
        relating the name of the regex to whether it was matched."""

        found_patterns = []
        for exp in self.known_patterns:
            matches = re.finditer(exp["pattern"], message.text)
            matches = list(matches)
            found_patterns.append(False)
            for token_index, t in enumerate(
                message.get(MESSAGE_TOKENS_NAMES[MESSAGE_TEXT_ATTRIBUTE], [])
            ):
                patterns = t.get("pattern", default={})
                patterns[exp["name"]] = False

                for match in matches:
                    if t.offset < match.end() and t.end > match.start():
                        patterns[exp["name"]] = True
                        found_patterns[-1] = True

                t.set("pattern", patterns)

        return np.array(found_patterns).astype(float)

    def _generate_lookup_regex(self, lookup_table):
        """creates a regex out of the contents of a lookup table file"""
        lookup_elements = lookup_table["elements"]
        elements_to_regex = []

        # if it's a list, it should be the elements directly
        if isinstance(lookup_elements, list):
            elements_to_regex = lookup_elements

        # otherwise it's a file path.
        else:

            try:
                f = open(lookup_elements, "r", encoding=rasa.utils.io.DEFAULT_ENCODING)
            except OSError:
                raise ValueError(
                    "Could not load lookup table {}"
                    "Make sure you've provided the correct path".format(lookup_elements)
                )

            with f:
                for line in f:
                    new_element = line.strip()
                    if new_element:
                        elements_to_regex.append(new_element)

        # sanitize the regex, escape special characters
        elements_sanitized = [re.escape(e) for e in elements_to_regex]

        # regex matching elements with word boundaries on either side
        regex_string = "(?i)(\\b" + "\\b|\\b".join(elements_sanitized) + "\\b)"
        return regex_string

    @classmethod
    def load(
        cls,
        meta: Dict[Text, Any],
        model_dir: Optional[Text] = None,
        model_metadata: Optional["Metadata"] = None,
        cached_component: Optional["RegexFeaturizer"] = None,
        **kwargs: Any,
    ) -> "RegexFeaturizer":

        file_name = meta.get("file")
        regex_file = os.path.join(model_dir, file_name)

        if os.path.exists(regex_file):
            known_patterns = rasa.utils.io.read_json_file(regex_file)
            return RegexFeaturizer(meta, known_patterns=known_patterns)
        else:
            return RegexFeaturizer(meta)

    def persist(self, file_name: Text, model_dir: Text) -> Optional[Dict[Text, Any]]:
        """Persist this model into the passed directory.
        Return the metadata necessary to load the model again."""
        file_name = file_name + ".pkl"
        regex_file = os.path.join(model_dir, file_name)
        utils.write_json_to_file(regex_file, self.known_patterns, indent=4)

        return {"file": file_name}