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