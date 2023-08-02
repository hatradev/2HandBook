function toggleFollow() {
    var followButton = document.getElementById('follow-button');

    if (followButton.textContent === 'Follow') {
        followButton.textContent = 'Followed';
        followButton.classList.toggle('clicked');
    } else {
        followButton.textContent = 'Follow';
        followButton.classList.toggle('clicked');
    }
}
function toggleSave(discountId) {
    var saveButton = document.querySelector('.save-button-' + discountId);

    if (saveButton.textContent === 'Save') {
        saveButton.textContent = 'Saved';
        saveButton.classList.toggle('clicked');
    } else {
        saveButton.textContent = 'Save';
        saveButton.classList.toggle('clicked');
    }
}
