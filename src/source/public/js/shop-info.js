function toggleFollow() {
    var followButton = document.getElementById('follow-button');

    if (followButton.textContent === 'Follow') {
        followButton.textContent = 'Followed';
        followButton.classList.add('followed');
    } else {
        followButton.textContent = 'Follow';
        followButton.classList.remove('followed');
    }
}
function toggleSave(discountId) {
    var saveButton = document.querySelector('.save-button-' + discountId);

    if (saveButton.textContent === 'Save') {
        saveButton.textContent = 'Saved';
        saveButton.classList.add('saved');
    } else {
        saveButton.textContent = 'Save';
        saveButton.classList.remove('saved');
    }
}
