const loadPhone = async (searchText='iphone', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phone = data.data;
    displayPhone(phone, isShowAll)
}

const displayPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = "";

    const showAllBtn = document.getElementById('show-all-btn')
    if(phones.length > 12 && !isShowAll){
        showAllBtn.classList.remove('hidden')
    }
    else{
        showAllBtn.classList.add('hidden')
    }
    if(!isShowAll){
        phones =  phones.slice(0, 12)
    }

    phones.forEach((phone) => {
        const phoneCard = document.createElement('div');
        phoneCard.innerHTML = `
        
        <div class="card p-8 bg-base-100 shadow-xl text-center">
        <figure><img src="${phone.image}" alt="phone image" /></figure>
        <div class=" flex flex-col space-y-5 ">
          <h2 class="text-2xl font-semibold mt-5">${phone.phone_name}</h2>
          <p>There are many variations of passages of available, but the majority have suffered</p>
          <p class="text-3xl font-semibold">$999</p>
          <div class="">
            <button onclick="show_phone_details.showModal(); showPhoneDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
      </div>

        `;
        phoneContainer.appendChild(phoneCard)
    });
    toggoleLoadingSpinner(false)
}

const handleSearch = (isShowAll) => {
    toggoleLoadingSpinner(true)
    const serachField = document.getElementById('search-field');
    const searchText = serachField.value;
    loadPhone(searchText, isShowAll)
}

const handleShowAll = () => (
    handleSearch(true)
)


const toggoleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

const showPhoneDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data;
    displayPhoneDetails(phone)
}


const displayPhoneDetails = (phone) => {
    console.log(phone)
    const detailsContainer = document.getElementById('show-details-container');
    detailsContainer.innerHTML = `
    
        <img src="${phone.image}" />
        <div class="space-y-5 mt-10">
            <h2><span class="text-3xl font-semibold">${phone.name}</span></h2>

            <p class="text-base">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>

            <p><span class="text-2xl font-medium">Storage: </span>${phone?.mainFeatures?.storage}</p>

            <p><span class="text-2xl font-medium">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>

            <p><span class="text-2xl font-medium">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>

            <p><span class="text-2xl font-medium">Memory: </span>${phone?.mainFeatures?.memory}</p>

            <p><span class="text-2xl font-medium">Slug: </span>${phone?.slug}</p>

            <p><span class="text-2xl font-medium">Release Date: </span>${phone?.releaseDate}</p>

            <p><span class="text-2xl font-medium">Brand: </span>${phone?.brand}</p>

            <p><span class="text-2xl font-medium">GPS: </span>${phone?.others?.GPS}</p>
        </div>
    
    `
}
// showPhoneDetails()
loadPhone()