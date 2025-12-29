const religionData: Record<string, {
    categories: Record<string, string[]>
}> = {
    demo1: {
        categories: {
            "1.1": ["1.1.1", "1.1.2"],
            "1.2": ["1.2.1", "1.2.2"]
        }
    },
    demo2: {
        categories: {
            "2.1": ["2.1.1", "2.1.2"],
            "2.2": ["2.2.1"]
        }
    }
};

function handleEquipmentChange(select: HTMLSelectElement): void {
    const wrapper = select.closest(".equipment-cell") as HTMLElement | null;
    if (!wrapper) return;

    const customInput = wrapper.querySelector(
        ".custom-equipment"
    ) as HTMLInputElement | null;

    if (!customInput) return;

    if (select.value === "Other") {
        customInput.style.display = "block";
    } else {
        customInput.style.display = "none";
        customInput.value = "";
    }
}



function updateCategory(): void {
    const religionSelect = document.getElementById("religion") as HTMLSelectElement | null;
    const categorySelect = document.getElementById("category") as HTMLSelectElement | null;
    const casteSelect = document.getElementById("caste") as HTMLSelectElement | null;

    if (!religionSelect || !categorySelect || !casteSelect) return;

    const religion = religionSelect.value;

    // Reset child dropdowns
    categorySelect.innerHTML = `<option value="">Select</option>`;
    casteSelect.innerHTML = `<option value="">Select</option>`;

    if (!religion || !religionData[religion]) return;

    const categories = religionData[religion].categories;

    Object.keys(categories).forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        categorySelect.appendChild(opt);
    });
}


function updateCaste(): void {
    const religionSelect = document.getElementById("religion") as HTMLSelectElement | null;
    const categorySelect = document.getElementById("category") as HTMLSelectElement | null;
    const casteSelect = document.getElementById("caste") as HTMLSelectElement | null;

    if (!religionSelect || !categorySelect || !casteSelect) return;

    const religion = religionSelect.value;
    const category = categorySelect.value;

    casteSelect.innerHTML = `<option value="">Select</option>`;

    if (
        !religion ||
        !category ||
        !religionData[religion] ||
        !religionData[religion].categories[category]
    ) return;

    const castes = religionData[religion].categories[category];

    castes.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        casteSelect.appendChild(opt);
    });
}


function addScheme(): void {
    const schemes = document.getElementById("schemes") as HTMLElement | null;
    if (!schemes) return;

    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.gap = "6px";

    const input = document.createElement("input");
    input.type = "text";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "X";
    btn.onclick = () => wrapper.remove();

    wrapper.appendChild(input);
    wrapper.appendChild(btn);
    schemes.appendChild(wrapper);
}

function generateMembers(): void {
    const countInput = document.getElementById("familyCount") as HTMLInputElement | null;
    const container = document.getElementById("members") as HTMLElement | null;

    if (!countInput || !container) return;

    const total = Number(countInput.value);
    const memberCount = total > 0 ? total - 1 : 0;

    container.innerHTML = "";

    for (let i = 1; i <= memberCount; i++) {
        const box = document.createElement("div");
        box.className = "card";

        box.innerHTML = `
            <strong>Member ${i}</strong>
            <div class="grid">

                <div class="field">
                    <label>Name</label>
                    <input type="text" />
                </div>

                <div class="field">
                    <label>Age</label>
                    <input type="number" min="0" />
                </div>

                <div class="field">
                    <label>Gender</label>
                    <select>
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>

                <div class="field">
                    <label>Relation with Head</label>
                    <input type="text" />
                </div>

                <div class="field">
                    <label>Marital Status</label>
                    <select>
                        <option value="">Select</option>
                        <option>Married</option>
                        <option>Unmarried</option>
                        <option>Widowed</option>
                    </select>
                </div>

                <div class="field">
                    <label>Mobile Number</label>
                    <input type="tel" />
                </div>

                <div class="field">
                    <label>Annual Income (₹)</label>
                    <input type="number" min="0" />
                </div>

                <div class="field">
                    <label>Education</label>
                    <input type="text" />
                </div>

                <div class="field">
                    <label>Occupation</label>
                    <input type="text" />
                </div>

                <div class="field">
                    <label>Aadhaar Number</label>
                    <input type="text" maxlength="12" />
                </div>

                <div class="field">
                    <label>PAN Number</label>
                    <input type="text" maxlength="10" />
                </div>

                <div class="field">
                    <label>ABHA Number</label>
                    <input type="text" />
                </div>

            </div>
        `;

        container.appendChild(box);
    }
}

function toggleFarm(val: string): void {
    const farmSection = document.getElementById("farmSection") as HTMLElement | null;
    if (!farmSection) return;

    farmSection.style.display = val === "Yes" ? "block" : "none";
}

function toggleOtherCrop(checked: boolean): void {
    const section = document.getElementById("otherCropSection") as HTMLElement | null;
    const inputs = document.getElementById("otherCropInputs") as HTMLElement | null;
    const countInput = document.getElementById("otherCropCount") as HTMLInputElement | null;

    if (!section || !inputs || !countInput) return;

    if (!checked) {
        section.style.display = "none";
        inputs.innerHTML = "";
        countInput.value = "";
    } else {
        section.style.display = "block";
    }
}

function generateOtherCrops(): void {
    const countInput = document.getElementById("otherCropCount") as HTMLInputElement | null;
    const container = document.getElementById("otherCropInputs") as HTMLElement | null;

    if (!countInput || !container) return;

    const count = Number(countInput.value);
    container.innerHTML = "";

    for (let i = 1; i <= count; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Other Crop ${i}`;
        container.appendChild(input);
    }
}

function toggleOtherIrrigation(checked: boolean): void {
    const section = document.getElementById("otherIrrigationSection") as HTMLElement | null;
    const inputs = document.getElementById("otherIrrigationInputs") as HTMLElement | null;
    const countInput = document.getElementById("otherIrrigationCount") as HTMLInputElement | null;

    if (!section || !inputs || !countInput) return;

    if (!checked) {
        section.style.display = "none";
        inputs.innerHTML = "";
        countInput.value = "";
    } else {
        section.style.display = "block";
    }
}

function generateOtherIrrigation(): void {
    const countInput = document.getElementById("otherIrrigationCount") as HTMLInputElement | null;
    const container = document.getElementById("otherIrrigationInputs") as HTMLElement | null;

    if (!countInput || !container) return;

    const count = Number(countInput.value);
    container.innerHTML = "";

    for (let i = 1; i <= count; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Other Irrigation Source ${i}`;
        container.appendChild(input);
    }
}


function addEquipment(): void {
    const tbody = document.querySelector(
        "#equipmentTable tbody"
    ) as HTMLTableSectionElement | null;

    if (!tbody) return;

    const row = tbody.insertRow();

    row.innerHTML = `
        <td>
            <div class="equipment-cell">
                <select onchange="handleEquipmentChange(this)">
                    <option value="">Select</option>
                    <option value="Spade">Spade (Kudad)</option>
                    <option value="Sickle">Sickle</option>
                    <option value="Plough">Plough</option>
                    <option value="Tractor">Tractor</option>
                    <option value="Other">Other</option>
                </select>
                <input 
                    type="text"
                    class="custom-equipment"
                    placeholder="Enter equipment name"
                    style="display:none"
                />
            </div>
        </td>

        <td>
            <input type="number" min="1" />
        </td>

        <td style="text-align:center;">
            <button 
                type="button" 
                class="remove-btn"
                onclick="this.closest('tr')?.remove()"
            >
                ✕
            </button>
        </td>
    `;
}



function addCattle(): void {
    const tbody = document.querySelector(
        "#cattleTable tbody"
    ) as HTMLTableSectionElement | null;

    if (!tbody) return;

    const row = tbody.insertRow();

    row.innerHTML = `
        <td>
            <select onchange="handleCattleTypeChange(this)">
                <option value="">Select</option>
                <option value="Cow">Cow</option>
                <option value="Buffalo">Buffalo</option>
                <option value="Goat">Goat</option>
                <option value="Other">Other</option>
            </select>
            <input 
                class="custom-cattle"
                placeholder="Enter animal type"
                style="display:none"
            />
        </td>

        <td>
            <input placeholder="Purpose (Milk / Meat / Farming)" />
        </td>

        <td>
            <div class="production-cell">
                <input type="number" min="0" placeholder="Qty" />
                <select>
                    <option value="">Unit</option>
                    <option>Litre</option>
                    <option>Kg</option>
                    <option>Count</option>
                    <option>Dozen</option>
                </select>
            </div>
        </td>

        <td>
            <input type="number" value="0" oninput="sumIncome()" />
        </td>

        <td style="text-align:center;">
            <button 
                type="button" 
                class="remove-btn"
                onclick="this.closest('tr')?.remove(); sumIncome()"
            >
                ✕
            </button>
        </td>
    `;
}

function handleCattleTypeChange(select: HTMLSelectElement): void {
    const cell = select.parentElement;
    if (!cell) return;

    const customInput = cell.querySelector(
        ".custom-cattle"
    ) as HTMLInputElement;

    if (!customInput) return;

    if (select.value === "Other") {
        customInput.style.display = "block";
        customInput.required = true;
    } else {
        customInput.style.display = "none";
        customInput.value = "";
        customInput.required = false;
    }
}


function sumIncome(): void {
    const incomeCells = document.querySelectorAll<HTMLInputElement>(
        "#cattleTable tbody input[type='number']"
    );

    let sum = 0;
    incomeCells.forEach(input => {
        sum += Number(input.value) || 0;
    });

    const totalCell = document.getElementById("totalIncome") as HTMLElement | null;
    if (!totalCell) return;

    totalCell.innerText = sum.toString();
}
