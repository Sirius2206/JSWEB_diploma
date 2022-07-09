/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  console.log("createRequest called")
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

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      const resp = xhr.response;
      console.log("onreadystatechange response: " + resp);
      callback(resp?.error, resp);
    };
  };

  let queryParams = '';
  const formData = new FormData();
  if (data){
    console.log("Это дата: " + Object.keys(data));
    if (method === 'GET') {
      queryParams = "?" + Object.entries(data).map(
        ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        ).join('&');
      } else {
        for (let [key, value] of Object.entries(data)) {
          formData.append(key, value);
        }
        console.log(formData);
      }
    }
    xhr.open(method, url + queryParams);
    xhr.send(formData);
};