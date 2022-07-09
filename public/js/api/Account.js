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

  static get(id = '', callback) {
    console.log("Account.get called");
    createRequest({
      data: id,
      url: this.URL + '/account/' + id,
      method: 'GET',
      callback: callback
    });
  }
}