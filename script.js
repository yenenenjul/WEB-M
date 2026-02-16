document.addEventListener("DOMContentLoaded", () => {

    let currentUser = null;
    let cart = [];
    let total = 0;

    const loginBtn = document.getElementById("loginBtn");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const Login = document.getElementById("Login");
    const Menu = document.getElementById("Menu");

    const cartCount = document.querySelector(".cart-count");
    const totalSpan = document.getElementById("total");
    const studentName = document.getElementById("studentName");
    const placeOrder = document.getElementById("placeOrder");
    const cancelOrder = document.getElementById("cancelOrder");
    const orderModal = document.getElementById("orderModal");

    // LOGIN
    loginBtn.addEventListener("click", () => {
        const u = username.value.trim();
        const p = password.value.trim();

        if (u === "admin" && p === "admin123") {
            location.href = "admin.html";
            return;
        }

        if (u === "student" && p === "1234") {
            currentUser = "student";
            studentName.textContent = "Hi, Student";
            Login.style.display = "none";
            Menu.style.display = "block";
        } else {
            alert("Invalid login");
        }
    });

    // ADD TO CART
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", () => {
            if (!currentUser) return alert("Login first");

            const qty = parseInt(btn.previousElementSibling.value);
            const price = parseInt(btn.dataset.price);

            cart.push({
                item: btn.dataset.item,
                qty,
                price
            });

            updateCart();
        });
    });

    // UPDATE CART
    function updateCart() {
        total = cart.reduce((sum, c) => sum + c.qty * c.price, 0);
        totalSpan.textContent = total;
        cartCount.textContent = cart.length;
    }

    // OPEN CART
    document.querySelector(".cart").addEventListener("click", () => {
        const list = document.getElementById("orderList");
        list.innerHTML = "";

        cart.forEach((c, i) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${c.item} (x${c.qty}) - ₱${c.qty * c.price}
                <button onclick="removeItem(${i})">❌</button>
            `;
            list.appendChild(li);
        });

        orderModal.style.display = "flex";
    });

    window.removeItem = (index) => {
        cart.splice(index, 1);
        updateCart();
        document.querySelector(".cart").click();
    };

    // PLACE ORDER (SHORT NUMBER)
    placeOrder.addEventListener("click", () => {
        if (!cart.length) return alert("Cart empty");

        const orderNumber = Math.floor(Math.random() * 9000) + 1000;

        const order = {
            orderNumber,
            student: currentUser,
            cart,
            total,
            status: "PENDING"
        };

        localStorage.setItem("order_" + orderNumber, JSON.stringify(order));

        alert("Order placed! #" + orderNumber);

        cart = [];
        updateCart();
    });

    // CANCEL ORDER
    cancelOrder.addEventListener("click", () => {
        cart = [];
        updateCart();
        alert("Order cancelled");
    });

    // CATEGORY FILTER
    document.querySelectorAll(".categories button").forEach(btn => {
        btn.addEventListener("click", () => {
            const cat = btn.dataset.category;

            document.querySelectorAll(".item").forEach(item => {
                item.style.display =
                    cat === "all" || item.dataset.category === cat
                        ? "block"
                        : "none";
            });
        });
    });

    // READY NOTIFICATION
    setInterval(() => {
        if (!currentUser) return;

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key.startsWith("order_")) continue;

            const order = JSON.parse(localStorage.getItem(key));

            if (order.student === currentUser && order.status === "READY") {
                alert(Order #${order.orderNumber} is READY for pickup!);
                localStorage.removeItem(key);
            }
        }
    }, 4000);

});

function closeModal() {
    document.getElementById("orderModal").style.display = "none";
}
