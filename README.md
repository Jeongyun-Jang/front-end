
# 🍺맥주계의 왓챠! 오늘의 술 (ohsool)
<img src="https://user-images.githubusercontent.com/52440784/131717465-c5d354b3-6531-41b7-82ea-b88c215437bc.png" width=100% />

## 프로젝트 요약
🚩 [사이트 링크](https://ohsool.com/)<br/>

* 다양한 종류의 맥주들을 한곳에 모아 개인의 취향을 바탕으로 맥주를 추천해주는 서비스
* 맥주에 대한 평점 및 시음 노트를 도감에 작성할 수 있으며 다른 유저와 도감을 확인하여 맥주 다양한 정보를 볼 수 있음

## 1. 팀 소개
- React, Node.js 기반
- 개발인원: 7명

   1) Front-end: 원동환, 장정윤

   2) Back-end: 이정원, 윤송, 문진영

   3) Designer: 문지혜, 이근호

- 📝[팀 노션](https://well-astronaut-b13.notion.site/team-OHSOOL-844e5fefc1d14df2b97f8b1cda4fb3ed)
- 📁[백엔드 Repository 링크](https://github.com/ohsool/backend)
- 🎨[디자인 작업물](https://www.figma.com/file/c2M6Yjvm5IjSAnsrQ41XLv/%ED%95%AD%ED%95%B499_WireFrame?node-id=0%3A1)

## 2. 프로젝트 설명
- 개발기간: 2021년 7월 23일 ~ 2021년 8월 31일
- 개발언어: JavaScript
- 개발 라이브러리:
	- React.js v17.0.2
		-자바스크립트 라이브러리, 웹 인터페이스를 만들기 위해 사용됨
- 배포 환경:
	- Amazon S3, CloundFront
- 소프트웨어 플랫폼 
	- Node v14.17.3 
- Yarn v1.22.10 / npm v6.14.13 / npx v6.14.13
	- 자바스크립트 패키지 매니저
    
- 협업 툴: git / notion / figma / slack
- 프로젝트 취지: 다양한 맥주 정보를 한눈에 비교하고, 자신만의 맥주 도감을 만들어 소통하는 맥주 정보 공유 플랫폼을 만들고자 함
## 3. 사용한 라이브러리(패키지)
- history v4.10.1, react-router-dom v5.2.0
	- 라우팅 관련 미들웨어 및 라이브러리
- axios v0.21.1
	- 서버와 통신을 위한 라이브러리
- react-slick v0.28.1 
	- 슬라이더를 구현용 라이브러리 
- react-chartjs-2 v3.0.4 / chart.js v3.5.0 
	- 그래프 구현 라이브러리
- react-step-progress-bar v1.0.3
	- 프로그래스 바 라이브러리
- styled-components v5.3.0
	- CSS-in-JS 라이브러리
- lodash v4.17.21
	- 자바스크립트의 유틸리티 라이브러리(디바운스와 쓰로틀 사용)
- moment v2.29.1
	- 날짜 라이브러리
- redux-toolkit v1.6.1
	- 전역 상태관리 라이브러리(redux, immer, reselect, thunk 한번에 사용가능)
## 4. 기술 소개
- 맥주 카테고리별 무한스크롤 기능
- 맥주 및 해시태그 검색 기능
- PWA구현
	- serviceworker활용해서 파일 캐싱 및 네트워크 불안정할때 오프라인 페이지 구현 및 푸시알림 기능(구현 진행중)
- kakao developer API 이용
	- kakao map구현해서 장소제보할수 있게 구현 및 테스트결과 및 맥주도감 페이지 공유기능 
- https 배포
	- AWS S3 버킷 등록 후, ACM(Amazon Certificate Manager)에서 인증서 발급 후 cloudfront를 이용해서 https 적용
- 상태관리
	- reselect를 이용해 store데이터를 메모이징
	- ExtraReducer를 활용해 스토어 데이터들 통합 접근 및 api요청 reject시 에러  
	- thunk를 이용한 비동기적 디스패치 및 데이터 관리
- 코드분할(Code-splitting)
	- lazy-suspense를 이용해서 라우팅처리된 컴포넌트들 비동기화


## 5. 핵심 트러블 슈팅
 [그 외 트러블 슈팅](https://wirehaired-snapper-f57.notion.site/139f7546dc6148118992ff3de0b06cc1)
### 카테고리별 무한스크롤
- 카테고리 페이지에서 다음 무한스크롤로 불러올 맥주 목록이 없을 시, 다른 카테고리 페이지로 넘어간 후에도 이전 ID 값의 상태가 남아있는 문제 발생
그래서 첫 렌더링 이후부터 categoryId가 바뀔때 마다 해당 카테고리의 첫번째 페이지를 불러오기 위한 함수 구현
~~~javascript
import React, { useEffect, useRef } from 'react';
const useDidMountEffect = (func, deps) => {
	const didMount = useRef(false);
	useEffect(() => {
		if (didMount.current) func(); //두번째부터 didMout.current가 ture이므로 func 실행
		else didMount.current = true; //첫실행시에 didMount.current를 true로 바꿈
	}, deps);
};

export default useDidMountEffect;
~~~
useDidMountEffect를 이용해서 beerCategoryId가 바뀔때마다 실행 되도록 함수를 구현
~~~javascript
useDidMountEffect(() => {
        setPaging(0);
        setBeers([]);
        dispatch(getBeerCategoryList({
            categoryId: beerCategoryId,
            pageNo: 0,
        }));
        setPaging(1)
        setLoading(false);
    }, [beerCategoryId]);
~~~
페이징 및 로딩까지 다음 페이지를 불러 올 수 있게 만들었으나 여전히 첫번째 페이지가 이전 카테고리의 Id값으로 고정되어 있었음
그래서 함수마다 상태를 하나 하나 확인해보니, 스크롤 이벤트를 등록하고, 클린업하는 useEffect에서 바뀌지 않는 것을 발견함
~~~javascript
useEffect(() => {
        if(loading){
            return;
        }
        window.addEventListener("scroll", _handleScroll); // scroll event listener 등록
        return () => {
            window.removeEventListener("scroll", _handleScroll); // scroll event listener 해제
        };
    }, [pagingCate, loading, beerCategoryId]); //deps가 바뀔때마다 클린업
~~~
그래서 beerCategoryId가 바뀔때마다 클린업을 진행해주니 원하는대로 해당 카테고리의 Id값을 가지고 정상적으로 작동함

### 렌더링 문제 
- beerList페이지나 BeerDetail페이지를 들어갈 때마다 데이터를 불러 왔다가 다시 초기화가 되고 리렌더링이 되는 문제가 발생함

 그래서 각종 방법들을 써서 줄여볼려 했으나 문제가 없어지지는 않았음 확인한 결과 현재 프로젝트에서는 reducer를 redux-toolkit 라이브러리를 이용해서 extraReducer를 가지고 
 상태반영을 하고 있었는데 여기서 pending 상태일 때 값을 초기화하는 부분에 문제가 있었음
 ~~~javascript
extraReducers: (builder) =>
    builder
        .addCase(getOneBeer.pending, (state, action) => {
            state.beerOne = null;
        })
        .addCase(getOneBeer.fulfilled, (state, action) => {
            state.beerOne = action.payload.beer;
        })
 ~~~
 여기서 pending으로 넘어갈 때마다 상태가 초기화가 되서 리렌더링이 계속 되는 문제가 발생
 ~~~javascript
useEffect(() => { //맥주 정보, 사용자정보 및 리뷰정보 불러오기
        dispatch(getOneBeer(props.match.params.beerId)); //맥주데이터 api요청
            return () => {
                //맥주 데이터 cleanup함수 다른페이지 갔다가 다른 맥주 클릭했을 시
                //잠시 그전 데이터가 보이는 것 방지
                dispatch(beerOneCleanUp());
            }
    }, [props.match.params.beerId]); //deps에 beerId넣어서 beerId바뀔때마다 위 요청들 실행
 ~~~
 초기화가 필요한 스토어의 데이터들은 위와 같은 방식으로 useEffect의 클린업을 이용해서 초기화를 해주는 방식으로 진행함. 그 결과 데이터가 받아온 이후로 리렌더링 되는 부분도 없어지고 대부분의 컴포넌트들이 마운트될 때 렌더링횟수도 6~7회에서 3회 이하로 개선됨
 
 ### PWA 및 ServiceWorker
-페이지가 업데이트 될때마다 이전 캐시스토리지를 초기화 해줘야되는 문제들이 발생함. workbox-precache를 이용해서 파일들을 캐싱하는 방법으로 진행하고 있었는데 이렇게 되니까 이전의 파일들을 지우는게 똑바로 진행이 안되서 서비스워커 파일을 직접 구현시킴
~~~html
<script>
  if ('serviceWorker' in navigator) { //서비스워커 불러오는 파트
      window.addEventListener('load', function() {
          navigator.serviceWorker.register('./worker.js')
          .then(function(registration) {
            // console.log(registration);
          }, function(err) {
              // console.log('Worker registration failed', err);
          }).catch(function(err) {
              // console.log(err);
          });
      });
  }
</script>
~~~
이렇게 index.html파일에서 실행을 시키고 worker.js파일을 구현시킴. 그래서 캐싱할 파일을 지정하고 오프라인일때 나오는 페이지도 캐싱목록에 넣어서 지정함
~~~javascript
let CACHE_NAME = 'ohsool version-1.4'; 
let urlsToCache = [
    '/index.html', //캐싱할 파일들
    '/offline.html' //오프라인일때 보여줄 페이지 (네트워크가 아예 끊어졌을때 새로고침하면 나오는 페이지)
];

// Install a service worker
self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache); //캐싱할파일들 전부 저장소에 저장
        })
    );
});
~~~
이렇게 캐시스토리지네임을 지정을 하고 
~~~javascript
self.addEventListener('activate', event => { //업데이트용
    let cacheWhitelist = [];   //여기에 들어간 캐시파일들이 업데이트 되는파일들
    cacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName); //화이트리스트에 들어가지않은 캐싱된 파일들은 전부 삭제
                    }
                })
            );
        })
    );
});
~~~
새로 업데이트를 할때마다 현재 캐시스토리지를 제외한 나머지 캐싱된 파일들을 다 지우도록 구현
그 결과 업데이트 된 캐시 스토리지만 남아 있고 이전 캐싱 파일들이 삭제되면서 정상적으로 작동

### Amazon S3 & Cloudfront
아마존 S3버킷 및 cloundfront를 이용해 배포를 진행했는데 버킷의 객체들을 업데이트 했는데도 웹에서 이전의 버전이 계속 나타나는 문제가 발생함
찾아보니 cloundfront는 이전에 배포한 데이터들을 24시간 동안 캐싱해서 보여주기 때문에 새로 업데이트를 하고 싶으면 이전 캐싱된 데이터들을 무효화를 시켜줘야함
그래서 이전 객체들을 무효화 시키고 진행하니 새로운 배포가 정상적으로 진행함
