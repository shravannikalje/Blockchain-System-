const API_BASE_URL = window.APP_CONFIG?.API_BASE_URL || "http://localhost:8080/api";

const state = {
	transactions: [],
	blocks: [],
	apiAvailable: false
};

const txTableBody = document.getElementById("txTableBody");
const chainView = document.getElementById("chainView");
const metricBlocks = document.getElementById("metricBlocks");
const metricTx = document.getElementById("metricTx");
const metricPending = document.getElementById("metricPending");
const toast = document.getElementById("toast");

function shortHash(input) {
	let hash = 0;
	for (let i = 0; i < input.length; i++) {
		hash = (hash << 5) - hash + input.charCodeAt(i);
		hash |= 0;
	}
	return "0x" + Math.abs(hash).toString(16).padStart(8, "0") + Math.random().toString(16).slice(2, 8);
}

function showToast(message) {
	toast.textContent = message;
	toast.classList.add("show");
	setTimeout(() => toast.classList.remove("show"), 1800);
}

async function requestApi(path, options = {}) {
	const response = await fetch(`${API_BASE_URL}${path}`, {
		headers: {
			"Content-Type": "application/json",
			...(options.headers || {})
		},
		...options
	});

	if (!response.ok) {
		throw new Error(`API error: ${response.status}`);
	}

	return response.json();
}

function renderTransactions() {
	txTableBody.innerHTML = "";

	state.transactions.slice().reverse().forEach((tx) => {
		const tr = document.createElement("tr");
		tr.innerHTML = `
			<td>${tx.id}</td>
			<td>${tx.from}</td>
			<td>${tx.to}</td>
			<td>${tx.amount}</td>
			<td><span class="status ${tx.status.toLowerCase()}">${tx.status}</span></td>
		`;
		txTableBody.appendChild(tr);
	});
}

function renderBlocks() {
	chainView.innerHTML = "";

	state.blocks.slice().reverse().forEach((block) => {
		const div = document.createElement("div");
		div.className = "block";
		div.innerHTML = `
			<div class="block-head">
				<span>Block #${block.index}</span>
				<span>${new Date(block.timestamp).toLocaleString()}</span>
			</div>
			<div class="muted">Creator: ${block.creator} | Nonce: ${block.nonce}</div>
			<div style="margin-top: 6px;">${block.data}</div>
			<div class="hash" style="margin-top: 8px;">Hash: ${block.hash}</div>
			<div class="hash">Prev: ${block.prevHash}</div>
		`;
		chainView.appendChild(div);
	});
}

function refreshMetrics() {
	metricBlocks.textContent = state.blocks.length;
	metricTx.textContent = state.transactions.length;
	metricPending.textContent = state.transactions.filter((t) => t.status === "Pending").length;
}

function renderAll() {
	renderTransactions();
	renderBlocks();
	refreshMetrics();
}

function addSampleTransaction() {
	const tx = {
		id: "TX-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
		from: ["Wallet-A", "Wallet-X", "User-101"][Math.floor(Math.random() * 3)],
		to: ["Wallet-B", "Wallet-Y", "Merchant-77"][Math.floor(Math.random() * 3)],
		amount: (Math.random() * 100).toFixed(2),
		status: Math.random() > 0.5 ? "Confirmed" : "Pending"
	};
	state.transactions.push(tx);
	renderAll();
	showToast("Sample transaction added");
}

async function addSampleTransactionApi() {
	const txPayload = {
		from: ["Wallet-A", "Wallet-X", "User-101"][Math.floor(Math.random() * 3)],
		to: ["Wallet-B", "Wallet-Y", "Merchant-77"][Math.floor(Math.random() * 3)],
		amount: Number((Math.random() * 100).toFixed(2)),
		status: Math.random() > 0.5 ? "Confirmed" : "Pending"
	};

	await requestApi("/transactions", {
		method: "POST",
		body: JSON.stringify(txPayload)
	});

	await loadDataFromApi();
	showToast("Sample transaction added (API)");
}

function addGenesisBlock() {
	const genesis = {
		index: 1,
		creator: "Genesis-Node",
		nonce: 1,
		data: "Genesis Block",
		timestamp: Date.now(),
		prevHash: "0x0000000000",
		hash: shortHash("genesis")
	};
	state.blocks = [genesis];
}

function resetData() {
	state.transactions = [];
	addGenesisBlock();
	renderAll();
	showToast("Demo data reset");
}

async function loadDataFromApi() {
	const [transactions, blocks] = await Promise.all([
		requestApi("/transactions"),
		requestApi("/blocks")
	]);

	state.transactions = transactions;
	state.blocks = blocks;
	renderAll();
}

document.getElementById("btnAddSample").addEventListener("click", async () => {
	if (state.apiAvailable) {
		await addSampleTransactionApi();
		return;
	}
	addSampleTransaction();
});
document.getElementById("btnReset").addEventListener("click", resetData);

document.getElementById("createBlockForm").addEventListener("submit", async (e) => {
	e.preventDefault();

	const creator = document.getElementById("creator").value.trim();
	const nonce = document.getElementById("nonce").value.trim();
	const data = document.getElementById("blockData").value.trim();

	if (!creator || !nonce || !data) {
		showToast("Please fill all block fields");
		return;
	}

	if (state.apiAvailable) {
		await requestApi("/blocks", {
			method: "POST",
			body: JSON.stringify({
				creator,
				nonce: Number(nonce),
				data
			})
		});

		e.target.reset();
		await loadDataFromApi();
		showToast("New block created (API)");
		return;
	}

	const prev = state.blocks[state.blocks.length - 1];
	const payload = `${creator}-${nonce}-${data}-${Date.now()}`;
	const newBlock = {
		index: state.blocks.length + 1,
		creator,
		nonce,
		data,
		timestamp: Date.now(),
		prevHash: prev ? prev.hash : "0x0000000000",
		hash: shortHash(payload)
	};

	state.blocks.push(newBlock);
	e.target.reset();
	renderAll();
	showToast("New block created");
});

// Initial state with backend fallback
(async () => {
	try {
		await loadDataFromApi();
		state.apiAvailable = true;
		showToast(`Backend connected: ${API_BASE_URL}`);
	} catch (_) {
		state.apiAvailable = false;
		addGenesisBlock();
		addSampleTransaction();
		addSampleTransaction();
		renderAll();
		showToast("Running in frontend demo mode");
	}
})();
