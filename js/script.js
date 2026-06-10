// js/script.js

// Lightbox function (opens big when clicking photos)
function openLightbox(src) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="magazine-page max-w-4xl p-8 max-h-[90vh] overflow-auto relative">
            <img src="${src}" class="mx-auto shadow-2xl" style="max-height: 85vh;">
            <button onclick="this.closest('.fixed').remove()" 
                    class="absolute -top-4 -right-4 text-5xl text-amber-900 hover:text-red-600">×</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Optional: Add more JS functions here later
console.log("✅ script.js loaded successfully");
