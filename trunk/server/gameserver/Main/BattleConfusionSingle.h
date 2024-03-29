//////////////////////////////////////////////////////////////////////
//文件名称：CBattleConfusionSingle.h
//功能描述：
//版本说明：CBattleConfusionSingle API
//			
//编写作者：2018.10.10 yanfeng.hu
//
//修改情况：完成基本功能搭建 V1.0.0
//
//////////////////////////////////////////////////////////////////////

#ifndef __BATTLECONFUSION_SINGLE_H__
#define __BATTLECONFUSION_SINGLE_H__

//////////////////////////////////////////////////////////////////////
//头文件
//////////////////////////////////////////////////////////////////////
#include "time.h"

class Player;

//////////////////////////////////////////////////////////////////////
//常量预定于
//////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////
//class
//////////////////////////////////////////////////////////////////////
class CBattleConfusionSingle
{
public:
	CBattleConfusionSingle(Player* pPlayer);
	virtual ~CBattleConfusionSingle();
	VOID Release()	{	delete this;	}

public:
	//获取对象指针
	Player* GetSignUpPlayer() {	return m_pSignUpPlayer;	}
	//获取报名时间戳
	time_t GetStampTime() {	return m_StampTime;	}

private:
	Player* m_pSignUpPlayer;				//报名玩家
	time_t m_StampTime;						//报名时间
	

};
#endif //__BATTLECONFUSION_SINGLE_H__