import {
  ButtonSize,
  ButtonVariation,
  FormRadiobuttonVariation,
  LayoutBlockVariation,
} from "@digi/arbetsformedlingen";
import {
  DigiButton,
  DigiFormCategoryFilter,
  DigiFormFilter,
  DigiFormRadiobutton,
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiTypography,
} from "@digi/arbetsformedlingen-react";

const educationForms = [
  {
    key: "af arbetsmarknadsutbildning",
    value: "Af arbetsmarknadsutbildning",
  },
  {
    key: "folkhögskola",
    value: "Folkhögskola",
  },
  {
    key: "grundläggande vuxenutbildning",
    value: "Grundläggande vuxenutbildning",
  },
  {
    key: "gymnasial vuxenutbildning",
    value: "Gymnasial vuxenutbildning",
  },
  {
    key: "högskoleutbildning",
    value: "Högskoleutbildning",
  },
  {
    key: "konst- och kulturutbildning",
    value: "Konst- och kulturutbildning",
  },
  {
    key: "utbildning med endast tillsyn",
    value: "Utbildning med endast tillsyn",
  },
  {
    key: "yrkeshögskoleutbildning",
    value: "Yrkeshögskoleutbildning",
  },
];

const SearchFilters = ({
  handleSearchFiltersChange,
}: {
  handleSearchFiltersChange: (filters: string[]) => void;
}) => {
  return (
    <section>
      <DigiTypography>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "end",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <DigiButton
            afSize={ButtonSize.MEDIUM}
            afVariation={ButtonVariation.PRIMARY}
            afFullWidth={false}
          >
            Rensa
          </DigiButton>
          <DigiFormFilter
            afFilterButtonText="Utbildningsform"
            afSubmitButtonText="Filtrera"
            afName="Utbildningsform"
            afListItems={educationForms.map((form) => ({
              id: form.key,
              label: form.value,
            }))}
            onAfSubmitFilter={(e) =>
              handleSearchFiltersChange(e.detail.checked)
            }
          />

          {/* <DigiFormCategoryFilter
            afCategories={[
              {
                name: "Kategori Ett",
                hits: 3,
                selected: true,
              },
            ]}
            afVisibleCollapsed={4}
            afStartCollapsed={false}
            afHideToggle={false}
          ></DigiFormCategoryFilter>
          <DigiFormRadiobutton
            afLabel="Radioknapp"
            afVariation={FormRadiobuttonVariation.PRIMARY}
          ></DigiFormRadiobutton> */}
        </div>
      </DigiTypography>
    </section>
  );
};

export default SearchFilters;
