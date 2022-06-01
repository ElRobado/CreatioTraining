namespace Terrasoft.Configuration.DomAdvertisingBlockService
{
    using System;
	using System.Net;
	using System.Collections.Generic;
    using System.ServiceModel;
    using System.ServiceModel.Web;
    using System.ServiceModel.Activation;
	using System.Runtime.Serialization;
    using Terrasoft.Core;
    using Terrasoft.Common;
  	using Terrasoft.Configuration;
    using Terrasoft.Core.Factories;
    using Terrasoft.Core.DB;
    using Terrasoft.Core.Entities; 
    using Terrasoft.Web.Common;
	using Newtonsoft.Json;

    /// <summary>
    /// Сервис, предоставляющий методы для работы с классом "Рекламный блок" (DomAdvertisingBlock)
    /// </summary>
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class DomAdvertisingBlockService: BaseService
    {
        /// <summary>
		/// Вызываемый метод сервиса, который запускает проверку, существует ли рекламный блок по Коду.
		/// Если существует, то запускает функцию подсчета суммы для связанных Выпусков и возвращает итог.
		/// Если не существует, то возвращает '-1'.
		/// </summary>
		/// <param name="DomAdvertisingBlockCode">Код "Рекламного блока", для которого вычисляется сумма.</param>
		/// <returns></returns>
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, 
            BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json)]
        public string GetSumForSessionsByAdBlockCode(string DomAdvertisingBlockCode) 
        {        
        	if (CheckIfAdvertisingBlockExists(DomAdvertisingBlockCode) == true) 
            {
            	return CalculateSumForSessionsByAdBlockCode(DomAdvertisingBlockCode).ToString();
            }
            else 
            {
            	return "-1";
            }
        }
        
        /// <summary>
		/// Метод, проверяющий, существует ли рекламный блок с Кодом DomAdvertisingBlockCode.
		/// </summary>
		/// <param name="DomAdvertisingBlockCode">Код "Рекламного блока", для которого производится проверка.</param>
		/// <returns>true - Рекламный блок существует, false - не существует.</returns>              
        private bool CheckIfAdvertisingBlockExists(string DomAdvertisingBlockCode) 
        {
        	var esqFindAdvertisingBlockIfExists = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "DomAdvertisingBlock");
            esqFindAdvertisingBlockIfExists.AddColumn("Id");
            var esqDomCodeFilter = esqFindAdvertisingBlockIfExists.CreateFilterWithParameters(FilterComparisonType.Equal, 
            	"DomCode", DomAdvertisingBlockCode);
            esqFindAdvertisingBlockIfExists.Filters.Add(esqDomCodeFilter);
            
            var collection = esqFindAdvertisingBlockIfExists.GetEntityCollection(UserConnection);
            
            if (collection.Count > 0) 
            {
            	return true;
            }
            else 
            {
            	return false;
            }
        }
        
        /// <summary>
		/// Метод, вычисляющий сумму стоимости для всех завершенных выпусков, связанных с Рекламным блоком,
        /// которому соответствует входящий Код DomAdvertisingBlockCode.
		/// </summary>
		/// <param name="DomAdvertisingBlockCode">Код "Рекламного блока", для которого вычисляется сумма.</param>
		/// <returns>Сумма стоимости для всех завершенных Выпусков.</returns>        
        private double CalculateSumForSessionsByAdBlockCode(string DomAdvertisingBlockCode) 
        {
            var esqSumForSessionPricesByAdBlockCode = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "DomSession");
            
            var totalSumColumn = esqSumForSessionPricesByAdBlockCode.AddColumn("DomPrice");
            totalSumColumn.SummaryType = AggregationType.Sum;

            var esqDomCodeFilter = esqSumForSessionPricesByAdBlockCode.CreateFilterWithParameters(FilterComparisonType.Equal, 
            	"DomAdvertisingBlock.DomCode", DomAdvertisingBlockCode);
            esqSumForSessionPricesByAdBlockCode.Filters.Add(esqDomCodeFilter);
            
            var esqDomSessionStateFilter = esqSumForSessionPricesByAdBlockCode.CreateFilterWithParameters(FilterComparisonType.Equal, 
            	"DomSessionState", DomConstantsCs.SessionState.Completed);
            esqSumForSessionPricesByAdBlockCode.Filters.Add(esqDomSessionStateFilter);
            
            double totalSum = 0.0;
            var summaryEntity = esqSumForSessionPricesByAdBlockCode.GetSummaryEntity(UserConnection);            
            if (summaryEntity != null)
            {
            	totalSum = Convert.ToDouble(summaryEntity.GetColumnValue(totalSumColumn.Name));             
            }            
            
            return totalSum;       
        }
    }  
}
 