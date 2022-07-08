/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  if (!options) {
    throw new Error('Не переданы параметры для createRequest');
  }

  let {
    url,
    data,
    method,
    callback
  } = options;

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open(method, url);
  if (!data) {
      xhr.send();
  } else {
    let formData = new FormData();
    for (let [key, value] of Object.entries(data)){
      formData.append(key, value);
    }
    console.log(formData);
      xhr.send(formData);
  }

  xhr.onloadend = () => {
    const resp = JSON.parse(xhr.response);
    console.log(resp);
    
      // ------------------тестить отсюда
      if (resp?.error) {
        options.callback(resp.error);
      } else {
        options.callback(null, resp);
      }
  }
};