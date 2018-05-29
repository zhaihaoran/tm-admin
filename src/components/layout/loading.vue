<template>
    <div class="loading1 page-loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page-loading {
    position: absolute;
    top: 15px;
    z-index: 1000;
    left: 50%;
    margin-left: -75px;
}

.loading1 {
    width: 150px;
    height: 10px;
    span {
        display: inline-block;
        width: 10px;
        height: 100%;
        margin-right: 2px;
        background: #bb2133;
        -webkit-transform-origin: right bottom;
        -webkit-animation: load1 1s ease infinite;
        &:last-child {
            margin-right: 0px;
        }
        &:nth-child(1) {
            -webkit-animation-delay: 0.13s;
        }
        &:nth-child(2) {
            -webkit-animation-delay: 0.26s;
        }
        &:nth-child(3) {
            -webkit-animation-delay: 0.39s;
        }
        &:nth-child(4) {
            -webkit-animation-delay: 0.52s;
        }
        &:nth-child(5) {
            -webkit-animation-delay: 0.65s;
        }
    }
}

.loading2 {
    width: 150px;
    height: 15px;
    span {
        position: absolute;
        width: 15px;
        height: 100%;
        border-radius: 50%;
        background: #bb2133;
        -webkit-animation: load2 1.04s ease-in infinite alternate;
        &:nth-child(1) {
            -webkit-animation-delay: 0.13s;
        }
        &:nth-child(2) {
            -webkit-animation-delay: 0.26s;
        }
        &:nth-child(3) {
            -webkit-animation-delay: 0.39s;
        }
        &:nth-child(4) {
            -webkit-animation-delay: 0.52s;
        }
        &:nth-child(5) {
            -webkit-animation-delay: 0.65s;
        }
    }
}

@-webkit-keyframes load1 {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        -webkit-transform: rotate(90deg);
    }
}
@-webkit-keyframes load2 {
    0% {
        opacity: 1;
        -webkit-transform: translate(0px);
    }
    100% {
        opacity: 0.2;
        -webkit-transform: translate(150px);
    }
}
</style>
