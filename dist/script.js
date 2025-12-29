"use strict";
const religionData = {
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
function handleEquipmentChange(select) {
    const wrapper = select.closest(".equipment-cell");
    if (!wrapper)
        return;
    const customInput = wrapper.querySelector(".custom-equipment");
    if (!customInput)
        return;
    if (select.value === "Other") {
        customInput.style.display = "block";
    }
    else {
        customInput.style.display = "none";
        customInput.value = "";
    }
}
function updateCategory() {
    const religionSelect = document.getElementById("religion");
    const categorySelect = document.getElementById("category");
    const casteSelect = document.getElementById("caste");
    if (!religionSelect || !categorySelect || !casteSelect)
        return;
    const religion = religionSelect.value;
    // Reset child dropdowns
    categorySelect.innerHTML = `<option value="">Select</option>`;
    casteSelect.innerHTML = `<option value="">Select</option>`;
    if (!religion || !religionData[religion])
        return;
    const categories = religionData[religion].categories;
    Object.keys(categories).forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        categorySelect.appendChild(opt);
    });
}
function updateCaste() {
    const religionSelect = document.getElementById("religion");
    const categorySelect = document.getElementById("category");
    const casteSelect = document.getElementById("caste");
    if (!religionSelect || !categorySelect || !casteSelect)
        return;
    const religion = religionSelect.value;
    const category = categorySelect.value;
    casteSelect.innerHTML = `<option value="">Select</option>`;
    if (!religion ||
        !category ||
        !religionData[religion] ||
        !religionData[religion].categories[category])
        return;
    const castes = religionData[religion].categories[category];
    castes.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        casteSelect.appendChild(opt);
    });
}
function addScheme() {
    const schemes = document.getElementById("schemes");
    if (!schemes)
        return;
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
function generateMembers() {
    const countInput = document.getElementById("familyCount");
    const container = document.getElementById("members");
    if (!countInput || !container)
        return;
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
function toggleFarm(val) {
    const farmSection = document.getElementById("farmSection");
    if (!farmSection)
        return;
    farmSection.style.display = val === "Yes" ? "block" : "none";
}
function toggleOtherCrop(checked) {
    const section = document.getElementById("otherCropSection");
    const inputs = document.getElementById("otherCropInputs");
    const countInput = document.getElementById("otherCropCount");
    if (!section || !inputs || !countInput)
        return;
    if (!checked) {
        section.style.display = "none";
        inputs.innerHTML = "";
        countInput.value = "";
    }
    else {
        section.style.display = "block";
    }
}
function generateOtherCrops() {
    const countInput = document.getElementById("otherCropCount");
    const container = document.getElementById("otherCropInputs");
    if (!countInput || !container)
        return;
    const count = Number(countInput.value);
    container.innerHTML = "";
    for (let i = 1; i <= count; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Other Crop ${i}`;
        container.appendChild(input);
    }
}
function toggleOtherIrrigation(checked) {
    const section = document.getElementById("otherIrrigationSection");
    const inputs = document.getElementById("otherIrrigationInputs");
    const countInput = document.getElementById("otherIrrigationCount");
    if (!section || !inputs || !countInput)
        return;
    if (!checked) {
        section.style.display = "none";
        inputs.innerHTML = "";
        countInput.value = "";
    }
    else {
        section.style.display = "block";
    }
}
function generateOtherIrrigation() {
    const countInput = document.getElementById("otherIrrigationCount");
    const container = document.getElementById("otherIrrigationInputs");
    if (!countInput || !container)
        return;
    const count = Number(countInput.value);
    container.innerHTML = "";
    for (let i = 1; i <= count; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Other Irrigation Source ${i}`;
        container.appendChild(input);
    }
}
function addEquipment() {
    const tbody = document.querySelector("#equipmentTable tbody");
    if (!tbody)
        return;
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
function addCattle() {
    const tbody = document.querySelector("#cattleTable tbody");
    if (!tbody)
        return;
    const row = tbody.insertRow();
    row.innerHTML = `
        <td>
            <select>
                <option value="">Select</option>
                <option>Cow</option>
                <option>Buffalo</option>
                <option>Goat</option>
                <option>Other</option>
            </select>
        </td>
        <td>
            <input placeholder="Custom type" />
        </td>
        <td>
            <input type="number" style="width:70px" />
            <select>
                <option>Litre</option>
                <option>Kg</option>
                <option>Count</option>
                <option>Dozen</option>
            </select>
        </td>
        <td>
            <input type="number" value="0" oninput="sumIncome()" />
        </td>
        <td>
            <button type="button" onclick="this.closest('tr')!.remove(); sumIncome()">X</button>
        </td>
    `;
}
function sumIncome() {
    const incomeCells = document.querySelectorAll("#cattleTable tbody input[type='number']");
    let sum = 0;
    incomeCells.forEach(input => {
        sum += Number(input.value) || 0;
    });
    const totalCell = document.getElementById("totalIncome");
    if (!totalCell)
        return;
    totalCell.innerText = sum.toString();
}
