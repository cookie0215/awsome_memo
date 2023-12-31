/* 
<메모 생성, 수정, 삭제하기>
1. input창에 내용 입력
2. '생성' 버튼 클릭
3. form에 입력한 값이 제출(전송)
4. input값에 입력한 내용은 지워져야 됨
5. 동시에 입력한 메모가 하단에 업데이트될 수 있도록 서버에게 요청을 보내야 한다. (fetch 사용 - 단, 이때 값을 update시켜야 하기 때문에 post요청을 해야 한다.)
6. 서버에 있는 값을 받아서 읽어줘야 한다. (get요청으로 값을 달라고 해야 함)
7. 이미 작성된 메모를 수정하기 위해 '수정하기'버튼을 만들어야 한다.
8. 메모를 삭제할 수 있는 버튼 만들기
*/


async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("수정할 내용을 입력하세요");

  // 수정하려는 내용을 서버에 요청
  const res = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      content: editInput,
    }),
  });

  readMemo();
}

async function deleteMemo(event) {
  const id = event.target.dataset.id;

  // 삭제하려는 내용을 서버에 요청
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE",
  });

  readMemo();
}

function displayMemos(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  li.innerText = memo.content;

  editBtn.innerText = "수정";
  editBtn.addEventListener('click', editMemo);
  editBtn.dataset.id = memo.id;

  deleteBtn.innerText = "삭제";
  deleteBtn.addEventListener('click', deleteMemo);
  deleteBtn.dataset.id = memo.id;


  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  ul.appendChild(li);
}

async function readMemo() {
  const res = await fetch("/memos")
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayMemos);
}


async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date(),
      content: value,
    }),
  });

  readMemo();
}

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector('#memo-input');
  createMemo(input.value);
  input.value = '';
}

const form = document.querySelector('#memo-form');
form.addEventListener('submit', handleSubmit);

readMemo();