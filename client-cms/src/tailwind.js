window.addEventListener('load', function () {
  alert('Hello!')
})


// Tailwind Script ----------------



function setDark(val) {
  if (val === 'dark') {
    document.documentElement.classList.add('dark');
    moon.classList.add('hidden');
    sun.classList.remove('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    sun.classList.add('hidden');
    moon.classList.remove('hidden');
  }
}

function openNav() {
  if (sidebar.classList.contains('-translate-x-48')) {
    // max sidebar
    sidebar.classList.remove('-translate-x-48');
    sidebar.classList.add('translate-x-none');
    maxSidebar.classList.remove('hidden');
    maxSidebar.classList.add('flex');
    miniSidebar.classList.remove('flex');
    miniSidebar.classList.add('hidden');
    maxToolbar.classList.add('translate-x-0');
    maxToolbar.classList.remove('translate-x-24', 'scale-x-0');
    logo.classList.remove('ml-12');
    content.classList.remove('ml-12');
    content.classList.add('ml-12', 'md:ml-60');
  } else {
    // mini sidebar
    sidebar.classList.add('-translate-x-48');
    sidebar.classList.remove('translate-x-none');
    maxSidebar.classList.add('hidden');
    maxSidebar.classList.remove('flex');
    miniSidebar.classList.add('flex');
    miniSidebar.classList.remove('hidden');
    maxToolbar.classList.add('translate-x-24', 'scale-x-0');
    maxToolbar.classList.remove('translate-x-0');
    logo.classList.add('ml-12');
    content.classList.remove('ml-12', 'md:ml-60');
    content.classList.add('ml-12');
  }
}

// End of Tailwind script ----------------

// Vue and Axios script ------------------
