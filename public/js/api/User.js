/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static URL = '/user';
  static setCurrent(user) {
    console.log("Вызван User.setCurrent:" + user.name);
    localStorage.setItem('user', user.name);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    console.log("Вызван User.unsetCurrent");
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    console.log("Вызван User.current: " + localStorage.getItem('user'));
    return localStorage.getItem('user');
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    console.log('Вызван fetch в User.fetch');

    createRequest({
      method: 'GET',
      url: this.URL + '/current',
      callback: (err, response) => {
        if (err) {
          console.log(err);
        }
        if (response && response.user) {
          User.setCurrent(response.user);
        } else {
          User.unsetCurrent();
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    console.log(" User.login(data, callback) called")
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    console.log("Вызван register на регистрации в User.register")
    createRequest({
      data: data,
      method: 'POST',
      url: this.URL + '/register',
      callback: callback
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      data: User.current(),
      url: this.URL + '/logout',
      method: 'POST',
      callback: (err, response) => {
        console.log(response);
        if (err) {
          callback(err);
        } else {
          this.unsetCurrent();
          App.setState('init');
        }
      }
    });
  }
}