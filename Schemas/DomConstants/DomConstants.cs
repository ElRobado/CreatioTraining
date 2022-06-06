using System;

namespace Terrasoft.Configuration
{
	public partial class DomConstants
	{
        #region DomSession
        /// <summary>
		/// Константы, содержащие значения состояний Выпуска (DomSession) из справочника DomSessionState.
		/// </summary>
        public static class SessionState 
		{
            // Завершен.
            public static readonly Guid Completed = new Guid("92b38898-d9d3-4126-ad13-1a9cc4616088");
		}
        /// <summary>
        /// Константы, содержащие значения ролей из SysAdminUnitTypeValue.
        /// </summary>    
        public static class SysAdminUnitTypeValue
        {
            // Родительская роль.
            public static readonly int ParentRole = 2;
            // Функциональная роль.
            public static readonly int FunctionalRole = 6; 
        }
      
      	#endregion
	}
}
