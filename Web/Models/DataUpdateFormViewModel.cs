using System.Collections.Generic;
using FirstReg.Data;
using Microsoft.AspNetCore.Http;

namespace FirstReg.Web.Models;

public class DataUpdateFormViewModel
{
    public string Surname { get; set; }
    public string OtherNames { get; set; }
    public Gender? Gender { get; set; }
    public AgeRange? AgeRange { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string Country { get; set; }
    public string PreviousAddress { get; set; }
    public string PreviousCity { get; set; }
    public string PreviousState { get; set; }
    public string PreviousCountry { get; set; }
    public string PrimaryNumber { get; set; }
    public string SecondaryNumber { get; set; }
    public string EmailAddress { get; set; }
    public string ClearingNo { get; set; }
    public string NIN { get; set; }
    public string TIN { get; set; }
    public string Nationality { get; set; }
    public string StateOfOrigin { get; set; }
    public string DateOfBirth { get; set; }
    public string NextOfKinFullName { get; set; }
    public string NextOfKinPhone { get; set; }
    public List<DataUpdateHoldingItem> Holdings { get; set; } = new();
    public List<DataUpdateRegisterOption> Registers { get; set; } = new();
    public IFormFile SignatureFile { get; set; }
    public string SignatureDataUrl { get; set; }
    public string SignatureMode { get; set; }
}

public class DataUpdateHoldingItem
{
    public int RegId { get; set; }
    public string AccountNo { get; set; }
}

public class DataUpdateRegisterOption
{
    public int Id { get; set; }
    public string Name { get; set; }
}
