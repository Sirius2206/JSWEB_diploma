/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = '';
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
    const request = {};
    request.data = data;
    request.url = this.URL + `?account_id=${data}`;
    request.method = 'GET';
    request.callback = callback;

    createRequest(request);
    //--------------------------Что делать с callback'ом?
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    const request = {};
    request.data = data;
    request.url = this.URL;
    request.method = 'PUT';
    request.callback = callback;
    createRequest(request);
    //--------------------------Что делать с callback'ом?
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    const request = {};
    request.data = data;
    request.url = this.URL;
    request.method = 'DELETE';
    request.callback = callback;
    createRequest(request);
    //--------------------------Что делать с callback'ом?
  }
}