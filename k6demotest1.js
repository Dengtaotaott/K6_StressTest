import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

export let options = {
    //stress test
    stages:[
        {duration:'1s',target:10},
        {duration:'5s',target:30},
        {duration:'10s',target:60},
        {duration:'25m',target:400},
        {duration:'10s',target:0},
    ],
};

export default function () {
    const response = http.get('http://test.k6.io');

    // 检查响应状态码是否为200
    check(response, { 'status was 200': (r) => r.status == 200 });

    // 获取当前虚拟用户的编号和迭代次数
    const vu = __VU;
    const iter = __ITER;

    // 仅在迭代次数是10的倍数时打印日志
    if (iter % 10 === 0) {
        console.log(`VU ${vu} - Iteration ${iter}: success`);
    }

    sleep(1);
}
