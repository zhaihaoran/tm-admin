<template>
    <div class="empty-404" >
        <img :src="empty_image" class="img-fluid img-empty" alt="empty">
        <div>
            <h3>页面暂无内容</h3>
            <p>抱歉，页面暂无内容，请看看其他页面<router-link to="/" > 回首页</router-link></p>
        </div>
    </div>
</template>
<script>
import empty_image from 'assets/image/empty_content.png';
export default {
    data() {
        return {
            empty_image
        };
    }
};
</script>
<style lang="scss" scoped>
.empty-404 {
    padding: 20px;
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.img-empty {
    max-width: 260px;
    margin-right: 50px;
}
</style>


