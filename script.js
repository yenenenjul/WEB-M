let currentUser = null;
let cart = [];
let total = 0;

const cartCount = document.getElementById("cartCount");
const totalSpan = document.getElementById("total");

// LOGIN
loginBtn.onclick = () => {
    if (username.value === "admin" && password.value === "admin123") {
        location.href = "admin.html";
        return;
    }

    if (password.value === "1234" && username.value) {
        currentUser = username.value;
        studentName.textContent = "Hi, " + currentUser;
        loginSection.style.display = "none";
        menuSection.style.display = "block";
    } else alert("Invalid login");
};

// CART
function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    cartCount.textContent = cart.length;
    totalSpan.textContent = total;
}

// PLACE ORDER
function placeOrder() {
    if (!cart.length) return alert("Cart empty");

    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const order = {
        orderNumber,
        student: currentUser,
        cart,
        total,
        status: "PENDING"
    };

    localStorage.setItem("order_" + orderNumber, JSON.stringify(order));
    alert(`Order placed! Order #${orderNumber}`);
    clearCart();
}

// CLEAR
function clearCart() {
    cart = [];
    total = 0;
    cartCount.textContent = 0;
    totalSpan.textContent = 0;
}

// READY NOTIFICATION
setInterval(() => {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.startsWith("order_")) continue;

        const order = JSON.parse(localStorage.getItem(key));
        if (order.student === currentUser && order.status === "READY") {
            alert(`Order #${order.orderNumber} is READY for pickup!`);
            localStorage.removeItem(key);
        }
    }
}, 4000);
