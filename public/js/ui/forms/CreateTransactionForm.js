/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    console.log("CreateTransactionForm.renderAccountsList called");
    const user = User.current();
    const callback = (error, response) => {
      if (error) {
        console.log(error);
      } else {
        console.log(response);
      }
    }

    Account.list(user, callback);
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    function callback(error, response) {
      if (error) {
        console.log(error);
      } else {
        App.update();
      }
    }
    Transaction.create(data, callback);

  }
}