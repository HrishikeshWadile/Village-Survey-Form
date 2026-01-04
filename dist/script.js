"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    input.setAttribute("data-key", "scheme");
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
            <strong>Member ${i} (कुटुंब सदस्य)</strong>
            <div class="grid">

                <div class="field">
                    <label>Name (नाव)</label>
                    <input type="text" data-key="name" />
                </div>

                <div class="field">
                    <label>Age (वय)</label>
                    <input type="number" min="0" data-key="age" />
                </div>

                <div class="field">
                    <label>Gender (लिंग)</label>
                    <select data-key="gender">
                        <option value="">Select (निवडा)</option>
                        <option>Male (पुरुष)</option>
                        <option>Female (स्त्री)</option>
                        <option>Other (इतर)</option>
                    </select>
                </div>

                <div class="field">
                    <label>Relation with Head (कुटुंब प्रमुखाशी नाते)</label>
                    <input type="text" data-key="relation" />
                </div>

                <div class="field">
                    <label>Marital Status (वैवाहिक स्थिती)</label>
                    <select data-key="maritalStatus">
                        <option value="">Select (निवडा)</option>
                        <option>Married (विवाहित)</option>
                        <option>Unmarried (अविवाहित)</option>
                        <option>Widowed (विधवा / विधुर)</option>
                    </select>
                </div>

                <div class="field">
                    <label>Mobile Number (मोबाईल क्रमांक)</label>
                    <input type="tel" data-key="mobileNumber" />
                </div>

                <div class="field">
                    <label>Annual Income (₹) (वार्षिक उत्पन्न)</label>
                    <input type="number" min="0" data-key="annualIncome" />
                </div>

                <div class="field">
                    <label>Education (शिक्षण)</label>
                    <input type="text" data-key="education" />
                </div>

                <div class="field">
                    <label>Occupation (व्यवसाय)</label>
                    <input type="text" data-key="occupation" />
                </div>

                
                <div class="field">
                    <label>Residence (राहण्याची जागा)</label>
                    <select title="Residence" data-key="residence">
                        <option value="">Select (निवडा)</option>
                        <option value="Village">Village (गाव)</option>
                        <option value="Outside Village">Outside Village (गावाबाहेर)</option>
                    </select>
                </div>
        

                <div class="field">
                    <label>Aadhaar Number (आधार क्रमांक)</label>
                    <input type="text" maxlength="12" data-key="aadhaarNumber" />
                </div>

                <div class="field">
                    <label>Ayushman Bharat Card Number (आभा क्रमांक)</label>
                    <select data-key="ayushmanBharatCard">
                        <option>Yes (होय)</option>
                        <option>No (नाही)</option>
                    </select>
                </div>
                
                <div class="field">
                    <label>Voting Card(मतदार कार्ड)</label>
                    <select title="Voting Card" data-key="votingCard">
                        <option value="">Select (निवडा)</option>
                        <option>Yes (होय)</option>
                        <option>No (नाही)</option>
                    </select>
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
    farmSection.style.display = val === "Yes (होय)" ? "block" : "none";
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
                    <option value="">Select (निवडा)</option>
                    <option value="Tractor">Tractor (ट्रॅक्टर)</option>
                    <option value="PowerTiller">Power Tiller (पॉवर टिलर)</option>
                    <option value="Harvester">Harvester (कापणी यंत्र)</option>
                    <option value="SprayerMachine">Sprayer Machine (फवारणी यंत्र)</option>
                    <option value="DripIrrigation">Drip Irrigation System (ठिबक सिंचन)</option>
                    <option value="Other">Other (नाही)</option>
                </select>
                <input 
                    type="text"
                    class="custom-equipment"
                    placeholder="Enter equipment name (साधनाचे नाव लिहा)"
                    style="display:none"
                />
            </div>
        </td>

        <td>
            <input 
                type="number" 
                min="1" 
                placeholder="Quantity (संख्या)"
            />
        </td>

        <td style="text-align:center;">
            <button 
                type="button" 
                class="remove-btn"
                title="Remove (काढा)"
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
            <select onchange="handleCattleTypeChange(this)">
                <option value="">Select (निवडा)</option>

                <!-- Large animals -->
                <option value="Cow">Cow (गाय)</option>
                <option value="Buffalo">Buffalo (म्हैस)</option>
                <option value="Bull/Ox">Bull / Ox (बैल)</option>

                <!-- Small livestock -->
                <option value="Goat">Goat (शेळी)</option>
                <option value="Sheep">Sheep (मेंढी)</option>
                <option value="Pig">Pig (डुक्कर)</option>

                <!-- Poultry -->
                <option value="Hen">Hen / Chicken (कोंबडी)</option>
                <option value="Duck">Duck (बदक)</option>

                <!-- Others -->
                <option value="Other">Other (इतर)</option>
            </select>

            <input 
                class="custom-cattle"
                placeholder="Enter animal type (प्राण्याचा प्रकार लिहा)"
                style="display:none"
            />
        </td>


        <td>
            <input placeholder="Purpose (उद्देश: दूध / मांस / शेती)" />
        </td>

        <td>
            <div class="production-cell">
                <input 
                    type="number" 
                    min="0" 
                    placeholder="Quantity (प्रमाण)"
                />
                <select>
                    <option value="">Unit (एकक)</option>
                    <option>Litre (लिटर)</option>
                    <option>Kg (किलो)</option>
                    <option>Count (संख्या)</option>
                    <option>Dozen (डझन)</option>
                </select>
            </div>
        </td>

        <td>
            <input 
                type="number" 
                value="0" 
                placeholder="Income ₹ (उत्पन्न)"
                class="income-input"
                oninput="sumIncome()" 
            />
        </td>

        <td style="text-align:center;">
            <button 
                type="button" 
                class="remove-btn"
                title="Remove (काढा)"
                onclick="this.closest('tr')?.remove(); sumIncome()"
            >
                ✕
            </button>
        </td>
    `;
}
function handleCattleTypeChange(select) {
    const cell = select.parentElement;
    if (!cell)
        return;
    const customInput = cell.querySelector(".custom-cattle");
    if (!customInput)
        return;
    if (select.value === "Other") {
        customInput.style.display = "block";
        customInput.required = true;
    }
    else {
        customInput.style.display = "none";
        customInput.value = "";
        customInput.required = false;
    }
}
function sumIncome() {
    const incomeInputs = document.querySelectorAll("#cattleTable tbody .income-input");
    let sum = 0;
    incomeInputs.forEach(input => {
        sum += Number(input.value) || 0;
    });
    const totalCell = document.getElementById("totalIncome");
    if (!totalCell)
        return;
    totalCell.innerText = sum.toString();
}
function submitCensusForm() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            // --- FAMILY DETAILS ---
            const familyDetails = {};
            // const familyFields = document.querySelectorAll("#members, #familyCount, input, select");
            // For simplicity, get all inputs in the top section
            const topInputs = document.querySelectorAll(".card:first-of-type .field input, .card:first-of-type .field select");
            topInputs.forEach(input => {
                var _a, _b;
                const el = input;
                const key = el.getAttribute("data-key") || el.id || el.name || ((_b = (_a = el.previousElementSibling) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim());
                if (key) {
                    familyDetails[key] = el.value;
                }
            });
            // --- SCHEMES ---
            const schemes = [];
            const schemeInputs = document.querySelectorAll("#schemes input[data-key='scheme']");
            schemeInputs.forEach(input => {
                const val = input.value.trim();
                if (val)
                    schemes.push(val);
            });
            familyDetails.schemes = schemes;
            // --- MEMBERS ---
            const members = [];
            const memberCards = document.querySelectorAll("#members .card");
            memberCards.forEach(card => {
                const member = {};
                const inputs = card.querySelectorAll("input, select");
                inputs.forEach(input => {
                    var _a, _b;
                    const el = input;
                    const key = el.getAttribute("data-key") || ((_b = (_a = el.previousElementSibling) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim());
                    if (key) {
                        member[key] = el.value;
                    }
                });
                members.push(member);
            });
            // --- FARM DETAILS ---
            const farmDetails = {};
            const farmSection = document.getElementById("farmSection");
            if (farmSection && farmSection.style.display !== "none") {
                // Total land area
                const landInput = farmSection.querySelector("input[title='Total Land Area']");
                farmDetails.totalLandArea = (landInput === null || landInput === void 0 ? void 0 : landInput.value) || "";
                // ---- CROPS (checkbox array) ----
                const crops = [];
                // ONLY crop checkboxes
                const cropCheckboxes = farmSection.querySelectorAll("input[type='checkbox'][value='Wheat'], \
                input[type='checkbox'][value='Rice'], \
                input[type='checkbox'][value='Sugarcane'], \
                input[type='checkbox'][value='Cotton'], \
                input[type='checkbox'][value='Maize']");
                cropCheckboxes.forEach(cb => {
                    const checkbox = cb;
                    if (checkbox.checked) {
                        crops.push(checkbox.value);
                    }
                });
                // Other crops (dynamic inputs only)
                const otherCropInputs = document.querySelectorAll("#otherCropInputs input");
                otherCropInputs.forEach(input => {
                    const val = input.value.trim();
                    if (val)
                        crops.push(val);
                });
                farmDetails.crops = crops;
                // ---- IRRIGATION SOURCES (checkbox array) ----
                const irrigationSources = [];
                const irrigationCheckboxes = farmSection.querySelectorAll("input[type='checkbox'][value='Well'], input[type='checkbox'][value='Borewell'], input[type='checkbox'][value='Canal'], input[type='checkbox'][value='River']");
                irrigationCheckboxes.forEach(cb => {
                    const checkbox = cb;
                    if (checkbox.checked) {
                        irrigationSources.push(checkbox.value);
                    }
                });
                // Other irrigation (dynamic inputs)
                const otherIrrigationInputs = document.querySelectorAll("#otherIrrigationInputs input");
                otherIrrigationInputs.forEach(input => {
                    const val = input.value.trim();
                    if (val)
                        irrigationSources.push(val);
                });
                farmDetails.irrigationSources = irrigationSources;
                // Year-round irrigation
                const yearRoundSelect = farmSection.querySelector("select[title='Year Round Irrigation']");
                farmDetails.yearRoundIrrigation = (yearRoundSelect === null || yearRoundSelect === void 0 ? void 0 : yearRoundSelect.value) || "";
                // Farm income
                const incomeInput = farmSection.querySelector("input[title='Farm Income per Year']");
                farmDetails.farmIncomePerYear = Number(incomeInput === null || incomeInput === void 0 ? void 0 : incomeInput.value) || 0;
            }
            // --- EQUIPMENT ---
            const equipment = [];
            const equipmentRows = document.querySelectorAll("#equipmentTable tbody tr");
            equipmentRows.forEach(row => {
                const eq = {};
                const select = row.querySelector("select");
                const input = row.querySelector("input[type='text']");
                const qty = row.querySelector("input[type='number']");
                eq["name"] = select.value === "Other" ? input.value : select.value;
                eq["quantity"] = Number(qty.value) || 0;
                if (!eq.name)
                    return;
                equipment.push(eq);
            });
            // --- CATTLE ---
            const cattle = [];
            const cattleRows = document.querySelectorAll("#cattleTable tbody tr");
            cattleRows.forEach(row => {
                const cat = {};
                const typeSelect = row.querySelector("select");
                const customInput = row.querySelector(".custom-cattle");
                const purpose = row.querySelector("td:nth-child(2) input");
                const production = row.querySelector("td:nth-child(3) input");
                const unit = row.querySelector("td:nth-child(3) select");
                const income = row.querySelector("td:nth-child(4) input");
                cat["type"] = typeSelect.value === "Other" ? customInput.value : typeSelect.value;
                cat["purpose"] = purpose.value;
                cat["production"] = production.value;
                cat["unit"] = unit.value;
                cat["income"] = Number(income.value) || 0;
                if (!cat.type)
                    return;
                cattle.push(cat);
            });
            const totalCattleIncome = cattle.reduce((sum, c) => sum + c.income, 0);
            // ================= SURVEY QUESTIONS (NEW) =================
            const surveyQuestions = {};
            let surveySection = null;
            const surveyTitles = document.querySelectorAll(".card-title.mb-3");
            for (const title of surveyTitles) {
                if ((_a = title.textContent) === null || _a === void 0 ? void 0 : _a.includes("Survey Questions")) {
                    surveySection = title.closest(".card");
                    break;
                }
            }
            if (surveySection !== null) {
                const fields = surveySection.querySelectorAll(".field");
                fields.forEach(field => {
                    var _a, _b;
                    const label = (_b = (_a = field.querySelector("label")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim();
                    const select = field.querySelector("select");
                    const input = field.querySelector("input[type='text']");
                    if (!label || (!select && !input))
                        return;
                    surveyQuestions[label] = input && input.value.trim()
                        ? { answer: (select === null || select === void 0 ? void 0 : select.value) || "", details: input.value.trim() }
                        : (select === null || select === void 0 ? void 0 : select.value) || "";
                });
            }
            // ================= FEEDBACK SECTION (NEW) =================
            const feedbackSection = {};
            let feedbackCard = null;
            const feedbackHeaders = document.querySelectorAll(".card h5");
            for (const h5 of feedbackHeaders) {
                if ((_b = h5.textContent) === null || _b === void 0 ? void 0 : _b.includes("Feedback")) {
                    feedbackCard = h5.closest(".card");
                    break;
                }
            }
            if (feedbackCard !== null) {
                const textarea = feedbackCard.querySelector("textarea");
                const select = feedbackCard.querySelector("select");
                feedbackSection.suggestions = (textarea === null || textarea === void 0 ? void 0 : textarea.value) || "";
                feedbackSection.satisfaction = (select === null || select === void 0 ? void 0 : select.value) || "";
            }
            // --- POST TO NETLIFY FUNCTION ---
            console.log({
                familyDetails,
                members,
                farmDetails,
                equipment,
                cattle,
                totalCattleIncome,
                surveyQuestions,
                feedbackSection
            });
            const response = yield fetch("/netlify/functions/submitCensus", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    familyDetails,
                    members,
                    farmDetails,
                    equipment,
                    cattle,
                    totalCattleIncome,
                    surveyQuestions,
                    feedbackSection
                })
            });
            let result = {};
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                result = yield response.json();
            }
            else {
                const text = yield response.text();
                result = { error: text };
            }
            if (!response.ok) {
                throw new Error(result.error || "Submission failed");
            }
            alert("✅ Census form submitted successfully!");
            console.log("Server response:", result);
        }
        catch (err) {
            console.error("Submit error:", err);
            alert("❌ Error submitting census form. Check console.");
        }
    });
}
