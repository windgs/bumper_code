//////////////////////////////////////////////////////////////////////
//文件名称：CItemAwardGroup.cpp
//功能描述：
//版本说明：CItemAwardGroup API
//			
//编写作者：2018.12.19 yanfeng.hu
//
//修改情况：完成基本功能搭建 V1.0.0
//
//////////////////////////////////////////////////////////////////////
#include "ItemAwardGroup.h"
#include "../../DataBase/DBMySql.h"
#include "../I_mydb.h"
#include "../Player.h"


//////////////////////////////////////////////////////////////////////
//常量预定于
//////////////////////////////////////////////////////////////////////
//构造
CItemAwardGroup::CItemAwardGroup()
{
    memset(&m_ItemAwardGroupInfo, 0, sizeof(m_ItemAwardGroupInfo));
}

//析构函数
CItemAwardGroup::~CItemAwardGroup()
{ 	
}