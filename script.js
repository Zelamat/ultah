document.addEventListener('DOMContentLoaded', () => {
    feather.replace(); 

    const playPauseButton = document.getElementById('play-pause');
    const audio = document.getElementById('audio');
    const songDuration = document.getElementById('song-duration');
    const lyricsContainer = document.getElementById('lyrics-container');
    let intervalId;

    const lyrics = [
        { time: 0, text: "alowwwwww sayanggg, ini hari, hari yang spesialllll sekali, karenaaaaa 1 oktober 2024 itu adalah hari kesaktian  pancasila :) hehe nda ktu. todayy is your birthdayyyyyy ututututututututu " },
        { time: 20, text: "disebelah kanan itu ada foto foto trg dua hehehee. ada juga foto yg mungkin sayangg nda tau kalo ada itu foto heheeheeee. jadi, maap yaaaww sayanggg. okayyy lanjuttt" },
        { time: 35, text: "diumurr yang baru, semua yang sayangg inginkan yang baik yakin dan percaya akan tercapai yaaw sayangggku" },
        { time: 45, text: "jadi lalaa yang baik terus yaaw, selalu rendah hati, rajin rajin ibadah, selalu  takut akan Tuhan, dan diumur yang baru ini semakin diberkati oleh Tuhan. jan lupa tetap andalkan Tuhan dan libatkan Tuhan dalam setiap saat yaaw. GBUUUUUUU  " },
        { time: 70, text: "tetap semangat yaaw menjalani kehidupan. bersyukur selaluu. kalo da apa apa bbilang pa saya yaaw, ta ada terus. kecuali tdrr heheee. ta akan selalu dengar sayang mo cerita apapun itu, cerita bahagia,sedih,keluh kesah, atau apapun itu yaaaaw.okayyyy lanjuttt" },
        { time: 98, text: "keep smilee uyuyuyu" },
        { time: 105, text: "ini waktu tpe ultah. senang sekali wktu itu hooohohhho" },
        { time: 112, text: "ini waktu digereja ehee. silauw dikit" },
        { time: 119, text: "anak pramuka skali inii. okayyy siap siap kak:)" },
        { time: 126, text: "apotek tutuppp... nda da obat hohoho" },
        { time: 133, text: "kalo yang ini malo malo hohoo. papamu da liat liat stau hohoho runn" },
        { time: 140, text: "wadohhhhhh, hooohohoho" },
        { time: 147, text: "euyyyyy cantiknya pacar aku" },
        { time: 154, text: "siapa yang foto nihhh. siapa tuhhhh hoohohoho" },
        { time: 161, text: "nahh ini waktu sayang sakit. uyuyuyuyuyuyuyu" },
        { time: 168, text: "ini jugaa, maap aku foto diam diam hehehehe" },
        { time: 175, text: "ehhh timbul ulang ini foto hohoohhohoho:)" },
        { time: 182, text: "ehhh da boboo sayanggg. hahahhahaha" },
        { time: 189, text: "selamat minum. minum air mineral yang banyak yaaw sayanggg" },
        { time: 196, text: "wadohhh, lucuuu amatt dirimu hoho" },
        { time: 203, text: "I LOVE U" },
    ];

    playPauseButton.addEventListener('click', () => {
        togglePlay();
    });

    function togglePlay() {
        if (audio.paused) {
            audio.play();
            playPauseButton.innerHTML = '<i data-feather="pause"></i>'; 
            feather.replace(); 
            displayDuration(); 
            startPageTransition(); 
            syncLyrics(); 
        } else {
            audio.pause();
            playPauseButton.innerHTML = '<i data-feather="play"></i>';
            feather.replace(); 
            clearInterval(intervalId); 
            clearInterval(lyricsInterval); 
        }
    }
    function displayDuration() {
        audio.addEventListener('loadedmetadata', () => {
            const duration = formatTime(audio.duration);
            songDuration.textContent = duration; 
        });

        audio.addEventListener('timeupdate', () => {
            const currentTime = formatTime(audio.currentTime);
            const duration = formatTime(audio.duration);
            songDuration.textContent = currentTime + ' / ' + duration; 
        });
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedTime = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        return formattedTime;
    }

    function preloadImages(pages) {
        return new Promise((resolve) => {
            let loadedCount = 0;
            const totalImages = pages.length;

            pages.forEach(page => {
                const img = page.querySelector('img');
                if (img.complete) {
                    loadedCount++;
                    if (loadedCount === totalImages) resolve();
                } else {
                    img.onload = () => {
                        loadedCount++;
                        if (loadedCount === totalImages) resolve();
                    };
                }
            });
        });
    }

    const rightPages = document.querySelectorAll('.right-page');
    let currentPage = 0;

    function showPage(pageIndex) {
        rightPages.forEach((page, index) => {
            if (index === pageIndex) {
                page.style.transform = 'rotateY(0deg)';
                page.style.zIndex = 2;
                page.style.visibility = 'visible';
            } else if (index < pageIndex) {
                page.style.transform = 'rotateY(-180deg)';
                page.style.zIndex = 1;
                page.style.visibility = 'visible';
            } else {
                page.style.transform = 'rotateY(0deg)';
                page.style.zIndex = 0;
                page.style.visibility = 'visible';
            }
        });

        if (pageIndex < rightPages.length - 1) {
            rightPages[pageIndex + 1].style.transform = 'rotateY(0deg)';
            rightPages[pageIndex + 1].style.zIndex = 1;
            rightPages[pageIndex + 1].style.visibility = 'visible';
        }
    }

    function nextPage() {
        if (currentPage < rightPages.length - 1) {
            currentPage++;
        } else {
            currentPage = 0; 
        }
        showPage(currentPage);
    }

    function startPageTransition() {
        intervalId = setInterval(nextPage, 7000);
    }

    function syncLyrics() {
        const lyricsInterval = setInterval(() => {
            const currentTime = audio.currentTime;
            const currentLyric = lyrics.find(lyric => Math.floor(lyric.time) === Math.floor(currentTime));
            if (currentLyric) {
                lyricsContainer.textContent = currentLyric.text;
            }
        }, 1000);
    }

    preloadImages(rightPages).then(() => {
        showPage(currentPage);
    });
});
