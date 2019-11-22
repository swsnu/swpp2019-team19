from django.db.models.fields.related import ManyToManyField


def to_dict(instance, field):
    opts = instance._meta
    data = {}
    for f in opts.concrete_fields + opts.many_to_many:
        if isinstance(f, ManyToManyField):
            if instance.pk is None:
                data[f.name] = []
            else:
                mtm_list = []
                for mtm in f.value_from_object(instance):
                    mtm_list.append(getattr(mtm, field))
                data[f.name] = mtm_list
        else:
            data[f.name] = f.value_from_object(instance)
    return data

