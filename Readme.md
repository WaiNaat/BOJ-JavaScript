# 개요
[백준 온라인 저지](https://www.acmicpc.net/)에서 [제가 푼 문제들](https://www.acmicpc.net/user/twicedtna)의 풀이를 저장하는 곳입니다.    
풀이는 틀린 풀이도 있을 수 있으며 그 경우 파일 맨 위에 틀렸다고 적혀 있습니다.    
간혹 문제마다 _v2, _v3 등 번호가 적혀 있을 수 있는데 대개 버전 번호가 높으면 더 제 마음에 드는 코드입니다.    
이하는 문제를 풀면서 제가 염두에 두어야 할 사항들을 짧게 적은 것입니다.   


# 생각하기
## DP
opt배열을 2차원으로 만드는 걸 무서워하지 말 것.    
해보고 시간/메모리 초과가 나면 그 다음에 생각해 봐도 늦지 않다.

## parseInt()
10^{-6} 보다 작아지면 오류 생기니까 조심

## Math.max()
넣는 값들의 개수가 10^7 보다 커지면 오류 발생 가능. 이럴 땐 자체 함수를 만드는 걸 추천.

## 삼항 연산자 A ? B : C;
괄호 똑바로 치기.    
특히 `X < A ? B : C` 이렇게 쓰지 말고 `(X < A)? B : C` 인지 `X < (A ? B : C)` 인지 명확히 할 것    
이거때문에 1시간 반 날렸음

## Array.sort(CompareFn);
CompareFn 반드시 제대로 만들어서 넣을 것. 안 넣으면 string 사전순으로 정렬해버림.     
이거때문에 1시간 날렸음.

## 백트래킹
백트래킹 자체가 모든 경우를 고려한다. 
따라서 백트래킹 내부에서 내가 고민해야 할 것은 다음 경우의 수'들'이 아니다. 다음 경우의 수 단 하나일 뿐이다.

## 변수에 값 할당
`[a, b, c] = [1, 2, 3]` 이렇게 한번에 하는것보다 세 줄에 나눠서 하는게 빠르다?

## function return
가능하면 아무것도 반환하지 않는 게 빠르다.   
특히 여러 값 반환한다고 `return [a, b, c];` 이렇게 할 거면 그냥 전역변수를 이용해서 처리하자.

## Array.sort에 넣는 compareFn

반환값은 boolean이 아니라 양수, 0, 음수여야 해!!!!!!!!!!!!!!!!!