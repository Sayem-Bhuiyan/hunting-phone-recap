const loadPhone = async (searchText, isShowAll) => {
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
    console.log('show all btn', isShowAll)
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
            <button class="btn btn-primary">Show Details</button>
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