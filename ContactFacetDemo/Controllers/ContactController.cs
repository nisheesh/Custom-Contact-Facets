using System.Web.Mvc;
using ContactFacetDemo.Data.Model;
using ContactFacetDemo.Data.Repositories;

namespace ContactFacetDemo.Web.Controllers
{
    public class ContactController : Controller
    {
        #region Properties
        private readonly ContactRepository _contactRepository;
        #endregion

        #region Constructor
        public ContactController()
        {
            _contactRepository = new ContactRepository();
        }
        #endregion

        #region Methods
        public ActionResult GetVisitorDetails()
        {
            var model = _contactRepository.GetVisitorDetails();
            return View("~/Views/Contact/VisitorDetail.cshtml", model);
        }

        public ActionResult RegistrationForm()
        {
            var model = _contactRepository.GetContactDetails();
            return View("~/Views/Contact/Register.cshtml", model);
        }

        public ActionResult PremiumContent()
        {
            var model = _contactRepository.GetPremiumContent();
            return View("~/Views/Contact/PremiumContent.cshtml", model);
        }

        [HttpPost]
        public JsonResult Submit(Contact contact)
        {
            //insert contact info here
            _contactRepository.SetEmailAddress(contact.EmailAddress);

            _contactRepository.SetPersonalInfo(contact.FirstName, string.Empty, contact.LastName, null, "Male", "");
            _contactRepository.SetPhoneNumber(contact.Phone);

            if (contact.OptIn)
                _contactRepository.UnlockPremiumContent();
            else
                _contactRepository.LockPremiumContent();

            ContactRepository.FlushDataToMongoDb();

            return Json(new { success = "true" });
        }

        [HttpPost]
        public JsonResult Subscribe(PremiumContentModel premiumContent)
        {

            if (string.IsNullOrEmpty(premiumContent.EmailAddress))
            {
                return Json(new { success = "false" });
            }
            _contactRepository.Subscribe(premiumContent);
            return Json(new { success = "true" });
        }

        public ActionResult DumpData()
        {
            ContactRepository.FlushDataToMongoDb();
            return View("~/Views/Contact/FlushData.cshtml");
        }
        #endregion
    }
}