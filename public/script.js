const tasksDOM = document.querySelector('.tasks');
const formDOM = document.querySelector('.task-form');
const taskInputDOM = document.querySelector('.task-input');
const formAlertDOM = document.querySelector('.form-alert');

// /api/v1/tasksからタスクを読み込む
const showTasks = async () => {
  try {
    const { data: tasks } = await axios.get('/api/v1/tasks'); 
    //ここが一番大事axios.getはconfig,data,headersなどの「属性」を取得するため、dataのみtasksの変数に代入している

    // タスクが１つもないとき
    if(tasks.length < 1) {
      tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`
      return;
    }

    // tasksの中にはname,_id, completedが「属性」として入っているため、mapで取り出す
    const allTasks = tasks.map((task) => {
      const { completed, _id, name } = task
      // console.log("name") これは何が出力されるか？
      // ← axios.getの中のdataの中に入っている【全て】のname属性が出力される

      return `      <div class="single-task ${completed && "task-completed"}">
      <h5>
        <span><i class="far fa-check-circle"></i></span>${name}
      </h5>
      <div class="task-links">
        <!-- 編集リンク -->
        <a href="edit.html?id=${_id}" class="edit-link">
          <i class="fas fa-edit"></i>
        </a>
        <!-- ゴミ箱リンク -->
        <button type="button" class="delete-btn" data-id="${_id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>`
  }).join("");
  tasksDOM.innerHTML = allTasks;
  }catch(error) {
    console.log(error);
  }
}

showTasks();


//タスクを新規作成する
formDOM.addEventListener("submit", async(event) => {
  event.preventDefault();
  const name = taskInputDOM.value;
  try {
    await axios.post("/api/v1/tasks", {name: name}); //右のnameはtaskInputDOM.value
    showTasks();
    taskInputDOM.value = ""; // preventDefaultを使用したため
    formAlertDOM.style.display = "block";
    formAlertDOM.classList.add("text-success"); //colorを緑色にする
    formAlertDOM.textContent = "タスクを追加しました。"
  } catch (error) {
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = "無効です。もう一度やり直してください。";
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success"); //text-successが残ったままになるから
  }, 3000);
});

// タスクを削除する
tasksDOM.addEventListener("click", async (event) => {
  const element = event.target; 
  if(element.parentElement.classList.contains("delete-btn")) {
    const id = element.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
      formAlertDOM.style.display = "block";
      formAlertDOM.textContent = "タスクを削除しました。"
    } catch(error) {
      formAlertDOM.innerHTML = "無効です。もう一度やり直してください。";
    }
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
  }, 5000);
});