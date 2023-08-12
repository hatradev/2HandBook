$('#staticAnnouncement').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget);
  var recipient = button.data('recipient');
  var title = button.data('title');
  var content = button.data('content');
  var time = button.data('time');
  var modal = $(this);
  modal.find('#mrecipient').text(recipient);
  modal.find('#staticBackdropLabel').text(title);
  modal.find('#mtime').text(time);
  modal.find('#mcontent').text(content);
});
