document.addEventListener("DOMContentLoaded", () => {

    let currentUser = null;
    let cart = [];
    let total = 0;

    const loginBtn = document.getElementById("loginBtn");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const Login = document.getElementById("Login");
    const Home = document.getElementById("Home");
    const Menu = document.getElementById("Menu");
    const studentName = document.getElementById("studentName");
    const logoutBtn = document.getElementById("logoutBtn");
    const cartCount = document.querySelector(".cart-count");
    const totalSpan = document.getElementById("total");
    const placeOrder = document.getElementById("placeOrder");

    // LOGIN
    loginBtn.addEventListener("click", () => {

        const u = username.value.trim();
        const p = password.value.trim();

        if (u === "admin" && p === "admin123") {
            location.href = "admin.html";
            return;
        }

        if (u && p === "1234") {
            currentUser = u;
            studentName.textContent = "Hi, " + u;

            Login.style.display = "none";
            Home.style.display = "block";
            Menu.style.display = "block";

            cart = [];
            total = 0;
            cartCount.textContent = "0";
            totalSpan.textContent = "0";

        } else {
            alert("Invalid login");
        }
    });

    // ADD TO CART
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", () => {

            if (!currentUser) {
                alert("Please login first");
                return;
            }

            const qtyInput = btn.previousElementSibling;
            const qty = parseInt(qtyInput.value);
            const price = parseInt(btn.dataset.price);

            const item = {
                name: btn.dataset.item,
                qty,
                price
            };

            cart.push(item);
            total += qty * price;

            cartCount.textContent = cart.length;
            totalSpan.textContent = total;
        });
    });

    // PLACE ORDER
    placeOrder.addEventListener("click", () => {

        if (!currentUser) return alert("Login first");
        if (!cart.length) return alert("Cart is empty");

        const orderNumber = Math.floor(Math.random() * 9000) + 1000; // short number

        const order = {
            orderNumber,
            student: currentUser,
            cart,
            total,
            status: "PENDING"
        };

        localStorage.setItem("order_" + orderNumber, JSON.stringify(order));

        alert("Order placed! Order #" + orderNumber);
        location.reload();
    });

    // LOGOUT
    logoutBtn.addEventListener("click", () => location.reload());
});
