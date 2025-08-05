        document.addEventListener('DOMContentLoaded', function () {
            const allPosters = document.querySelectorAll('.category-poster');
            const contentSections = document.querySelectorAll('.content-section');
            const categoryCarouselElement = document.getElementById('categoryCarousel');
            const movieAccordions = document.querySelectorAll('.movie-accordion');

            // --- Unified function to change the active category ---
            function activateCategory(targetId) {
                // Update active state for all posters (desktop and mobile)
                allPosters.forEach(p => {
                    if (p.getAttribute('data-target') === targetId) {
                        p.classList.add('active');
                    } else {
                        p.classList.remove('active');
                    }
                });

                // Show the correct content section
                contentSections.forEach(section => {
                    if ('#' + section.id === targetId) {
                        section.classList.add('active');
                    } else {
                        section.classList.remove('active');
                    }
                });
            }

            // --- Logic for Poster Clicks (works for both desktop and mobile) ---
            allPosters.forEach(poster => {
                poster.addEventListener('click', function () {
                    const targetId = this.getAttribute('data-target');
                    activateCategory(targetId);
                });
            });

            // --- Logic for Mobile Carousel Sliding ---
            if (categoryCarouselElement) {
                // When the carousel slides, activate the category of the new item
                categoryCarouselElement.addEventListener('slid.bs.carousel', function (event) {
                    const activePoster = event.relatedTarget.querySelector('.category-poster');
                    if (activePoster) {
                        const targetId = activePoster.getAttribute('data-target');
                        activateCategory(targetId);
                    }
                });
            }

            // --- Logic for Lazy-Loading YouTube Videos ---
            movieAccordions.forEach(accordion => {
                accordion.addEventListener('show.bs.collapse', function (event) {
                    const iframe = event.target.querySelector('iframe');
                    if (iframe) {
                        const youtubeId = iframe.getAttribute('data-yt-id');
                        if (youtubeId && !iframe.getAttribute('src')) {
                            iframe.setAttribute('src', `https://www.youtube.com/embed/${youtubeId}?autoplay=1`);
                        }
                    }
                });

                accordion.addEventListener('hide.bs.collapse', function (event) {
                    const iframe = event.target.querySelector('iframe');
                    if (iframe) {
                        iframe.setAttribute('src', '');
                    }
                });
            });
        });