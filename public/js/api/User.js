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
  static setCurrent( user ) {
    console.log("Вызван User.setCurrent;");
    localStorage.setItem( 'user', user );
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
    console.log("Вызван User.current");
    return localStorage.getItem('user');
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    console.log('Вызван fetch в User.fetch');
    const request = {};
    request.method = 'GET';
    request.url = this.URL + '/current';
    request.callback = ( err, response ) => {
      if (response && response.user) {
        User.setCurrent(response.user);
      } else {
        User.unsetCurrent();
      }
      // callback(err, response);
    }
    createRequest(request);
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
    const request = {};
    request.data = data;
    request.method = 'POST';
    request.url = this.URL + '/register';
    request.callback = callback;
    createRequest(request);
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    const request = {};
    request.url = this.URL + '/logout';
    request.method = 'POST';
    request.callback = (err, response) => {
      try {
        if (response.success) {
          this.unsetCurrent();
        }
      } catch (e) {
        callback(e);
      }
    }
    createRequest(request);
  }
}
