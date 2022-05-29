const formShape = [
	"firstName",
	"lastName",
	"department",
	"dateOfBirth",
	"startDate",
	"street",
	"city",
	"state",
	"zipCode",
];

export default async () => {

	const req = window.indexedDB.open("hrnet", 1);

	const p = new Promise((resolve, reject) => {

		req.onupgradeneeded = (event) => {
			event.preventDefault();
			const db = event.target.result;
			const store = db.createObjectStore("subjects", {
				keyPath: "id",
				autoIncrement: true
			});
			formShape.forEach((field) => {
				store.createIndex(field, field, {
					unique: false
				});
			});
		};

		req.onsuccess = (e) => {
			e.preventDefault();
			resolve(e.target.result);
		};

		req.onerror = (e) => {
			e.preventDefault();
			console.warn("Error opening database", e);
			reject();
		};
	});

	return p;
};