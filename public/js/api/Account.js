/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  static URL = '/account';
  
  static get(id = '', callback){
    const request = {};
    request.url = this.URL + '/account/' + id;
    request.method = 'GET';
    request.callback = callback;
    
    createRequest(request);
  }
}
