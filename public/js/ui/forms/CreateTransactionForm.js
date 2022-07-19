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
    this.element = element;
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let resultHTML ='';
    const user = User.current();
    const callback = (error, response) => {
      if (error) {
        console.log(error);
      } else {
        for (let i in response.data) {
          resultHTML += `<option value="${response.data[i].id}">${response.data[i].name}</option>`;
        }
        this.element.querySelector(".accounts-select").innerHTML = resultHTML;
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
    const callback = (error) => {
      if (error) {
        console.log(error);
      } else {
        App.update();
        App.getModal('newIncome')?.close();
        App.getModal('newExpense')?.close();
        this.element.reset()
      }
    }
    Transaction.create(data, callback);

  }
}