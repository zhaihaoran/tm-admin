<template>
    <div class="video card-hover hoverable">
        <div class="card-image">
            <img class="img-fluid" :src="video.img">
            <span class="vd-times badge">{{video.time}}</span>
        </div>
        <div class="card-content">
            <span class="card-title grey-333">{{video.title}}</span>
            <div class="vd-extra">
                <span>演讲者：{{video.author}}</span>
                <span>学校：{{video.school}}</span>
                <span>{{video.startTime}} <span class="text-right" >{{video.count}} 次播放</span> </span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['video']
};
</script>
<style>

</style>


