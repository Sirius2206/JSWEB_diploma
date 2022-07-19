/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    const callback = (error) => {
      if (error) {
        console.log(error);
      } else {
        App.getModal('createAccount').close();
        App.update();
        this.element.reset();
      }
    }
    Account.create(data, callback);
  }
}
// Отправляет запрос на создание счёта через Account.create
// Закрывает окно, в котором находится форма при успешном ответе
// Сбрасывает форму и вызывает App.update() при успешном ответе