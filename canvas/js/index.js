const startButton = document.querySelector("button");
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const canvasWidth = 500;
const canvasHeight = 500;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

let intervalId;
let shapes = []; // 도형 배열

// 범위 내에서 랜덤한 숫자를 생성하는 함수
const getRandomNumber = (max) => Math.floor(Math.random() * max);

// 비눗방울 객체 생성
const createBubble = () => {
    const x = getRandomNumber(canvasWidth);
    const y = getRandomNumber(canvasHeight);
    const radius = getRandomNumber(60);
    const speedX = Math.random() - 0.5; // X축 이동 속도
    const speedY = Math.random() - 0.5; // Y축 이동 속도

    return {
        x,
        y,
        radius,
        speedX,
        speedY,
    };
};

// 도형을 그리는 함수
const drawShapes = () => {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];

        context.beginPath();
        context.fillStyle = shape.color;
        context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
        context.fill();
    }
};

// 도형 위치 업데이트 함수
const updateShapesPosition = () => {
    for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];

        // 새로운 위치 계산
        shape.x += shape.speedX;
        shape.y += shape.speedY;

        // 캔버스 경계 처리
        if (
            shape.x - shape.radius <= 0 ||
            shape.x + shape.radius >= canvasWidth
        ) {
            shape.speedX *= -1; // X축 이동 방향 반전
        }

        if (
            shape.y - shape.radius <= 0 ||
            shape.y + shape.radius >= canvasHeight
        ) {
            shape.speedY *= -1; // Y축 이동 방향 반전
        }
    }
};

// 애니메이션 프레임 업데이트 함수
const updateAnimation = () => {
    drawShapes();
    updateShapesPosition();
    requestAnimationFrame(updateAnimation); // 다음 프레임 업데이트 요청
};

// 시작 버튼에 클릭 이벤트 리스너 추가
startButton.addEventListener("click", () => {
    startButton.textContent = '▶️▶️'
    if (!intervalId) {
        // 도형 배열 초기화
        shapes = [];

        // 비눗방울 객체 생성 후 배열에 추가
        const bubbleNum = getRandomNumber(1000)
        for (let i = 0; i < bubbleNum; i++) {
            const bubble = createBubble();

            // 랜덤한 RGB 값과 투명도 생성
            const red = getRandomNumber(256);
            const green = getRandomNumber(256);
            const blue = getRandomNumber(256);
            const alpha = Math.random();
            const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

            // 녹색 계열의 비눗방울인 경우에만 배열에 추가
            const isGreen = green > red && green > blue;
            if (isGreen) {
                bubble.color = color;
                shapes.push(bubble);
            }
        }

        // 애니메이션 시작
        updateAnimation();
    }
});
