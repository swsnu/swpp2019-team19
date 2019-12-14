import axios from 'axios';

export const updateServer = () => {
  axios.get('/rasa_kor/makefile/');
  axios.get('/rasa_eng/makefile/').then(
    axios.get('/admin_command/update/')
  )
}
export const updateModel = () => axios.get('/admin_command/replace/');
