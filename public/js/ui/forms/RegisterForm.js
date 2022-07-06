/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    function callback (error) {
      if (error) {
        console.log(error);
      }else {
        this.element.reset();
        App.setState('user-logged');
        App.getModal('register').close();
      }
    }
    User.register(data, callback);
  }
}

// Регистрирует пользователя через User.register
// При успешной регистрации сбрасывает форму
// При успешной регистрации задаёт состояние App.setState( 'user-logged' ). То есть мы сразу авторизуем пользователя после успешной регистрации.
// Находит окно, в котором находится форма и закрывает его (через метод Modal.close)