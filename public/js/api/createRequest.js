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

  xhr.onload = function () {
      const resp = xhr.response;
      callback(resp?.error, resp);
  };

  xhr.onerror = function() {
    console.log("Во время обработки запроса произошла ошибка");
  }

  let queryParams = '';
  const formData = new FormData();
  if (data){
    if (method === 'GET') {
      queryParams = "?" + Object.entries(data).map(
        ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        ).join('&');
      } else {
        for (let [key, value] of Object.entries(data)) {
          formData.append(key, value);
        }
      }
    }
    xhr.open(method, url + queryParams);
    xhr.send(formData);
};