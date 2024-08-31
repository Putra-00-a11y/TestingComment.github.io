// Mengambil elemen-elemen DOM
const commentList = document.getElementById('commentList');
const nameInput = document.getElementById('name');
const addressInput = document.getElementById('address');
const hobbyInput = document.getElementById('hobby');
const commentInput = document.getElementById('commentInput');
const commentForm = document.getElementById('commentForm');

// Fungsi untuk mengambil komentar dari Local Storage
function getComments() {
    let comments = localStorage.getItem('comments');
    return comments ? JSON.parse(comments) : [];
}

// Fungsi untuk menyimpan komentar ke Local Storage
function saveComments(comments) {
    localStorage.setItem('comments', JSON.stringify(comments));
}

// Fungsi untuk menambahkan komentar ke dalam daftar dan menyimpan ke Local Storage
function addComment(commentData) {
    let comments = getComments();
    comments.push(commentData);
    saveComments(comments);
    renderComments();
}

// Fungsi untuk menampilkan komentar di halaman
function renderComments() {
    let comments = getComments();
    commentList.innerHTML = '';
    comments.forEach(comment => {
        let li = document.createElement('li');
        li.innerHTML = `<strong>Name:</strong> ${comment.name} <br>
                        <strong>Address:</strong> ${comment.address} <br>
                        <strong>Hobby:</strong> ${comment.hobby} <br>
                        <strong>Comment:</strong> ${comment.comment}`;
        commentList.appendChild(li);
    });
}

// Event listener untuk pengiriman form
commentForm.addEventListener('submit', (event) => {
    event.preventDefault();  // Mencegah reload halaman

    // Mengambil nilai dari form input
    let name = nameInput.value.trim();
    let address = addressInput.value.trim();
    let hobby = hobbyInput.value.trim();
    let comment = commentInput.value.trim();

    // Memastikan bahwa semua input tidak kosong
    if (name && address && hobby && comment) {
        const commentData = {
            name: name,
            address: address,
            hobby: hobby,
            comment: comment
        };
        addComment(commentData);

        // Mengosongkan input setelah submit
        nameInput.value = '';
        addressInput.value = '';
        hobbyInput.value = '';
        commentInput.value = '';
    }
});

// Render komentar saat halaman pertama kali dimuat
renderComments();
