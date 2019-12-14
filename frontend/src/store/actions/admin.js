import axios from 'axios';

export const updateServer = () => axios.get('/admin_command/update/');
export const updateModel = () => axios.get('/admin_command/replace/');
