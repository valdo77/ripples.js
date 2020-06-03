document.querySelectorAll('[ripple]').forEach(item => {

    var rippleParams = {};
    item.style.position = 'relative';
    item.style.overflow = 'hidden';

    item.addEventListener('click', (e) => {
        rippleParams.color = item.getAttribute('ripple-color') || '#fff';
        rippleParams.duration = item.getAttribute('ripple-duration') || '500';
        rippleParams.opacity = item.getAttribute('ripple-opacity') || '0.6';
        rippleParams.radius = item.getAttribute('ripple-radius') || '500';
        rippleParams.blur = item.getAttribute('ripple-blur') || '2';

        if( rippleParams.color === 'random' ) {
            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);
            rippleParams.color = `rgb(${red}, ${green}, ${blue})`;
        }

        var x = e.clientX - e.target.offsetLeft;
        var y = e.clientY - e.target.offsetTop;

        var ripples = document.createElement('span');
        
        const ripplesStyle = {
            position: 'absolute',
            top: y + 'px',
            left: x + 'px',
            height: '10px',
            width: '10px',
            background: rippleParams.color,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            opacity: rippleParams.opacity,
            filter: `blur(${rippleParams.blur}px)`
        }

        setRipplesStyle(ripples, ripplesStyle);
        item.appendChild(ripples);

        ripples.animate([
            {width: '10px', height: '10px', opacity: parseFloat(rippleParams.opacity)},
            {width: rippleParams.radius + 'px', height: rippleParams.radius + 'px', opacity: 0}
        ], {
            duration: parseInt(rippleParams.duration),
            fill: 'forwards',
            iterations: 1
        });

        setTimeout(() => {
            ripples.remove();
        }, parseInt(rippleParams.duration) + 150);

    })

})


function setRipplesStyle(element, style) {
    Object.assign(element.style, style);
}
