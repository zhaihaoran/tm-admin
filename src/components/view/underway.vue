<template>
    <div>
        <Search :searchConfig="searchConfig" ></Search>
        <div class="tm-card">
            <el-table :data="listData" border class="tm-table" >
                <el-table-column
                    prop="fromSide"
                    align="center"
                    label="邀约发起者"
                    :filters="[{text: '演讲者', value: '演讲者'}, {text: '学校', value: '学校'}]"
                    :filter-method="filterFromSide"
                >
                    <template slot-scope="scope">
                        <el-tag
                        :type="scope.row.fromSide === '学校' ? 'primary' : 'success'"
                        close-transition>{{scope.row.fromSide}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakerName"
                    align="center"
                    label="演讲者">
                </el-table-column>
                <el-table-column
                    prop="speakTitle"
                    align="center"
                    label="演讲主题"  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="speakTimestamp"
                    align="center"
                    sortable
                    label="演讲时间">
                </el-table-column>
                <el-table-column
                    prop="speakDuration"
                    align="center"
                    label="演讲时长（分钟）">
                </el-table-column>
                <el-table-column
                    prop="ct"
                    align="center"
                    label="发起邀约时间">
                </el-table-column>
                <el-table-column
                    prop="schoolStatus"
                    align="center"
                    min-width="120px"
                    label="进展">
                    <template slot-scope="scope">
                        <el-popover class="offer-step" ref="popover" trigger="click">
                            <el-steps direction="vertical" class="admin-step" :active="scope.row.schoolStatus">
                                <el-step title="待开课通知"></el-step>
                                <el-step title="待上课"></el-step>
                                <el-step title="待课后反馈提交"></el-step>
                                <el-step title="待课后反馈确认"></el-step>
                                <el-step title="完成"></el-step>
                            </el-steps>
                        </el-popover>
                        <el-button type="text" v-popover:popover v-if="scope.row.schoolStatus === 1"  >待开课通知</el-button>
                        <el-button type="text" v-popover:popover v-if="scope.row.schoolStatus === 2"  >待上课</el-button>

                        <el-button type="text" v-if="scope.row.schoolStatus === 3"  ><span v-popover:popover >待课后反馈提交</span><span class="normal-a" @click='modal.upload=true' > (立即上传）</span></el-button>
                        <el-button type="text" v-popover:popover v-if="scope.row.schoolStatus === 4"  >待课后反馈确认</el-button>
                        <el-button type="text" v-popover:popover v-if="scope.row.schoolStatus === 5"  >完成</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakerStatus"
                    align="center"
                    label="演讲者进展">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="消息">
                    <template slot-scope="scope">
                        <MessageBox :scope="scope" ></MessageBox>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog :visible.sync="modal.upload" title="提交反馈" >
                <el-row :gutter="10" >
                    <el-col class="pic-cube" :xs="12" :sm="8" v-for="photo in fileList" :key="photo.$index" >
                        <img :src="photo.url" class="img-fluid" alt="photo">
                    </el-col>
                </el-row>
                <el-upload
                    class="upload-demo"
                    :action="uploadUrl()"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :on-success="handleSuccess"
                    multiple
                    :limit="3"
                    list-type="picture"
                    :show-file-list="false"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,最多只能上传三张</div>
                </el-upload>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import mapsAttr from '@comp/lib/api_maps.js';
import Search from '@layout/search.vue';
import MessageBox from '@layout/modal/message.vue';

export default {
    components: {
        Search,
        MessageBox
    },
    data() {
        return {
            modal: {
                upload: false
            },
            searchConfig: {
                // 两个时间戳
                input: [973822200000, 973908600000],
                category: 'right'
            },
            listData: [
                {
                    fromSide: mapsAttr['fromSide'][1],
                    speakerName: 'zhaiharoan',
                    speakTitle: '电影人的梦想',
                    speakTimestamp: mapsAttr.dateformat(973822200000),
                    speakDuration: 60,
                    ct: mapsAttr.dateformat(973822200000),
                    chatUnreadQuantity: 2, // 对话信息数
                    schoolStatus: 1, // 学校进展状态
                    speakerStatus: mapsAttr['speakerStatus'][1] // 演讲者进展状态
                },
                {
                    fromSide: mapsAttr['fromSide'][2],
                    speakerName: '王八蛋',
                    speakTitle: '肖申克救赎',
                    speakTimestamp: mapsAttr.dateformat(973822200000),
                    speakDuration: 60,
                    ct: mapsAttr.dateformat(973822200000),
                    chatUnreadQuantity: 5, // 对话信息数
                    schoolStatus: 2, // 学校进展状态
                    speakerStatus: mapsAttr['speakerStatus'][2] // 演讲者进展状态
                },
                {
                    fromSide: mapsAttr['fromSide'][1],
                    speakerName: '王珂司',
                    speakTitle: '电影人的梦想',
                    speakTimestamp: mapsAttr.dateformat(973822200000),
                    speakDuration: 60,
                    ct: mapsAttr.dateformat(973822200000),
                    chatUnreadQuantity: 3, // 对话信息数
                    schoolStatus: 3, // 学校进展状态
                    speakerStatus: mapsAttr['speakerStatus'][100] // 演讲者进展状态
                }
            ],
            photos: [
                // 在static下的文件不经过处理，引用必须用绝对路径
                '/static/image/guests/guest1.png',
                '/static/image/guests/guest3.png',
                '/static/image/guests/guest2.png',
                '/static/image/guests/guest4.png',
                '/static/image/guests/guest4.png',
                '/static/image/guests/guest1.png'
            ],
            fileList: [
                {
                    name: 'guest1.jpeg',
                    url: '/static/image/guests/guest1.png'
                },
                {
                    name: 'guest2.jpeg',
                    url: '/static/image/guests/guest1.png'
                }
            ]
        };
    },
    methods: {
        filterFromSide(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        uploadUrl() {
            return 'https://jsonplaceholder.typicode.com/posts/';
        },
        handleRemove(file, fileList) {
            console.log('remove');
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log('preview');
            console.log(file);
        },
        handleExceed(files, fileList) {
            console.log('exceed');
            this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        handleSuccess(files, fileList) {
            console.log('success');
            console.log(fileList);
            const obj = {
                name: fileList.name,
                src: fileList.url
            };
            this.fileList.push(obj);
        },
        beforeRemove(file, fileList) {
            console.log('beforeRemove');
            return this.$confirm(`确定移除 ${file.name}？`);
        }
    }
};
</script>
<style>
.normal-a {
    color: #409eff;
}
.pic-cube {
    margin: 5px 0;
}
</style>


