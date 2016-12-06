$scope.SaveSwp = function (index)
{
var startDate = $('.datepicker').slice(2 * index).val();
var endDate = $('.datepicker').slice(2 * index + 1).val();
//允许19800101日期格式
if (startDate != null && IsNumeric(startDate) && startDate.length == 8)
{
    startDate = startDate.substring(0, 4) + '-' + startDate.substring(4, 6) + '-' + startDate.substring(6, 8);
}
startDate = startDate == null || startDate.length < 8 ? NaN : Date.parse(startDate);
if (endDate != null && IsNumeric(endDate) && endDate.length == 8)
{
    endDate = endDate.substring(0, 4) + '-' + endDate.substring(4, 6) + '-' + endDate.substring(6, 8);
}
endDate = endDate.length < 8 ? NaN : Date.parse(endDate);

if (isNaN(startDate) || !!$scope.swpList[index].endDate && isNaN(endDate))//填写了日期信息，但格式不对
{
    alert("请按正确的格式填写日期信息");
    return false;
}
$scope.swpList[index].StartDate = startDate;
$scope.swpList[index].EndDate = endDate;
var newAdded = $scope.swpList[index].NewAdded == true ? true : false;
$http.get("SaveSupplierWithPromoter?SwpId=" + $scope.swpList[index].SwpId + "&SupplierId=" + $scope.swpList[index].SupplierId + "&StartDate=" + $scope.swpList[index].StartDate + "&EndDate=" + $scope.swpList[index].EndDate + "&NewAdded=" + newAdded)
.success(function (response)
{
    if (response.Result)
    {
	$scope.GetSupplierWithPromoter();
	$scope.swpList[index].Editing = false;
    }
    else
    {
	alert(response.Message);
    }
});
}
	
	
	
$('.datepicker').slice(2 * index, 2 * index + 2).datepicker({ language: "zh-CN", format: 'yyyy-mm-dd', startDate: '0d', autoclose: true }).on('changeDate', function (e){});
