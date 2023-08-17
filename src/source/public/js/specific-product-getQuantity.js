document.addEventListener('DOMContentLoaded', function () {
    const buyNowBtn = document.getElementById('buy-now-btn'); 
    const quantitySpan = document.querySelector('.quantity-number');
    buyNowBtn.addEventListener('click', function (event) {
        event.preventDefault();
        // Ngăn chặn hành vi mặc định khi click vào nút 
        const productID = '{{product._id}}';
        // ID của sản phẩm 
        const quantity = parseInt(quantitySpan.textContent); 
        // Lấy giá trị số lượng từ span 
        // Tạo URL mới với tham số số lượng 
        const newURL = `/order/payment/${productID}?quantity=${quantity}`; // Chuyển hướng trình duyệt tới URL mới 
        window.location.href = newURL;
    });
});
